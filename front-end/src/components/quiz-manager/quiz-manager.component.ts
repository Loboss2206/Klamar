import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialTableComponent} from "../material-table/material-table.component";
import {QuestionsPicklistComponent} from "../questions-picklist/questions-picklist.component";
import IQuiz from "../../interfaces/IQuiz";
import {QuizService} from "../../services/quiz-service.service";
import {NgClass, NgIf} from "@angular/common";
import {GenericButtonComponent} from "../genericButton/genericButton.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import IQuestion from "../../interfaces/IQuestion";
import ISimonConfig from "../../interfaces/ISimonConfig";
import {ImagesPicklistComponent} from "../images-picklist/images-picklist.component";
import {SearchQuizSelectorComponent} from "../search-quiz-selector/search-quiz-selector.component";

@Component({
  selector: 'app-quiz-manager',
  standalone: true,
  imports: [MaterialTableComponent, QuestionsPicklistComponent, NgIf, GenericButtonComponent, FormsModule, NgClass, ReactiveFormsModule, ImagesPicklistComponent, SearchQuizSelectorComponent],
  templateUrl: './quiz-manager.component.html',
  styleUrl: './quiz-manager.component.scss'
})
export class QuizManagerComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  editMode: boolean = false;
  currentQuizID: number = 0;
  quizName: string = "";
  quizDescription: string = "";
  quizImage: string = "";
  pickListDataSubscription: Subscription | undefined;
  imagePickListDataSubscription: Subscription | undefined;
  allQuestions: IQuestion[] = [];
  existingQuizQuestions: IQuestion[] = [];
  isSimonGameOnQuiz: boolean = false;
  isMemoryGameOnQuiz: boolean = false;
  simonConfig: ISimonConfig = {numberOfRound: 5, numberOfBoxes: 4, numberOfRetriesAllowed: 2};
  simonConfigForm: FormGroup = this.fb.group({});
  simonConfigOpened: boolean = false;
  isInMemoryEdit: boolean = false
  allImages: string[] = [];
  imagesAlreadyInTheMemory: string[] = [];


  constructor(private quizService: QuizService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.quizService.getCurrentQuiz().subscribe((quizId) => {
      this.currentQuizID = quizId.id;
      this.quizName = quizId.title;
      this.quizDescription = quizId.quizDescription;
      this.quizImage = quizId.imageUrl;
      this.existingQuizQuestions = this.quizService.getQuestionsForQuiz(quizId.id);
      if (quizId.specials) {
        this.isSimonGameOnQuiz = quizId.specials.some(special => special.name === "Simon");
        this.isMemoryGameOnQuiz = quizId.specials.some(special => special.name === "Memory");
      }
      this.simonConfigForm = this.fb.group({
        numberOfRound: [quizId.specials?.find(special => special.name === "Simon")?.rulesForSimon?.numberOfRound, Validators.required],
        numberOfBoxes: [quizId.specials?.find(special => special.name === "Simon")?.rulesForSimon?.numberOfBoxes, Validators.required],
        numberOfRetriesAllowed: [quizId.specials?.find(special => special.name === "Simon")?.rulesForSimon?.numberOfRetriesAllowed, Validators.required]
      });
      this.simonConfigOpened = false;
      this.isInMemoryEdit = false;
    });

    this.pickListDataSubscription = this.quizService.getQuestionsPickListData().subscribe((data) => {
      this.allQuestions = data.allQuestions;
      this.existingQuizQuestions = data.existingQuizQuestions;
    });

    this.imagePickListDataSubscription = this.quizService.getImagesPickListData().subscribe((data) => {
      this.allImages = data.allImages;
      this.imagesAlreadyInTheMemory = data.imageAlreadyOnTheMemory;
    });
  }

  ngOnDestroy() {
    if (this.pickListDataSubscription) {
      this.pickListDataSubscription.unsubscribe();
    }

    if (this.imagePickListDataSubscription) {
      this.imagePickListDataSubscription.unsubscribe();
    }
  }

  openFileChooser() {
    if (this.fileInput)
      this.fileInput.nativeElement.click();
  }

  convertImageToBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        if (!event.target) {
          reject();
          return;
        }
        resolve(event.target.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.convertImageToBase64(file).then((base64Image) => {
      this.quizImage = base64Image as string;
    }).catch(() => {
      console.error("Error while converting image to base64");
    });
  }

  editQuiz(quizId: number) {
    this.currentQuizID = quizId;
    console.log("Editing quiz with id " + quizId);
    this.quizService.setQuiz(quizId);
    this.editMode = true;
  }

  deleteQuiz(quizId: number) {
    this.quizService.deleteQuiz(quizId);
  }

  createQuiz() {
    this.editMode = true;
    this.currentQuizID = -1;
    this.clearQuiz();
  }

  saveQuiz(id: number, quiz: IQuiz) {
    console.log("Saving quiz with id " + id);
    console.log(quiz);
    if (id <= 0) {
      this.quizService.createQuiz(quiz);
      return;
    }
    this.quizService.saveQuiz(id, quiz);
  }

  cancelEdit() {
    this.editMode = false;
  }

  getHeaders() {
    return ["Image du quiz", "Titre du quiz", "Description du quiz", "Informations sur le quiz"];
  }

  getActions(): any[] {
    return [
      {name: "Editer", className: "edit"},
      {name: "Supprimer", className: "delete"}
    ];
  }

  takeAction(id: number, action: string) {
    console.log("Action taken on quiz with id " + id + " : " + action);
    switch (action) {
      case "rowClick":
      case "Editer":
        this.editQuiz(id);
        break;
      case "Supprimer":
        this.deleteQuiz(id);
        break;
    }
  }

  SaveCurrentQuiz() {
    let questionsIDs: string[] = this.existingQuizQuestions.map((question) => question.id);
    let specials: { name: string, rulesForSimon?: ISimonConfig }[] = [];
    let picsMemory: string[] = [];
    if (this.isSimonGameOnQuiz) {
      specials.push({name: "Simon", rulesForSimon: this.simonConfig});
    }
    if (this.isMemoryGameOnQuiz) {
      specials.push({name: "Memory"});
      picsMemory = this.imagesAlreadyInTheMemory;
    }
    let quiz: IQuiz = {
      id: this.currentQuizID,
      title: this.quizName,
      quizDescription: this.quizDescription,
      imageUrl: this.quizImage,
      questions: questionsIDs.map((id) => parseInt(id)),
      specials: specials,
      picsMemory: picsMemory
    }
    this.editMode = false;
    console.log(quiz, this.currentQuizID);
    this.saveQuiz(this.currentQuizID, quiz);
  }

  openParametersForSimon() {
    this.simonConfigOpened = !this.simonConfigOpened;
  }

  saveSimonConfig() {
    console.log(this.simonConfigForm);
    if (!this.simonConfigForm?.valid) {
      return;
    }
    this.simonConfig = {
      numberOfRound: this.simonConfigForm.get('numberOfRound')?.value,
      numberOfBoxes: this.simonConfigForm.get('numberOfBoxes')?.value,
      numberOfRetriesAllowed: this.simonConfigForm.get('numberOfRetriesAllowed')?.value
    }
    this.simonConfigOpened = false;
  }

  closeSimonConfig() {
    this.simonConfigOpened = false;
  }

  openMemoryConfig() {
    this.editMode = false;
    this.isInMemoryEdit = true;
  }

  closeMemoryConfig() {
    this.editMode = true;
    this.isInMemoryEdit = false;
  }

  SearchQuizzes($event: string) {
    let newQ = this.quizService.searchQuizzes($event);
  }

  private clearQuiz() {
    this.quizName = "";
    this.quizDescription = "";
    this.quizImage = "";
    this.existingQuizQuestions = [];
    this.isSimonGameOnQuiz = false;
    this.isMemoryGameOnQuiz = false;
    this.simonConfig = {numberOfRound: 5, numberOfBoxes: 4, numberOfRetriesAllowed: 2};
    this.simonConfigForm = this.fb.group({
      numberOfRound: [5, Validators.required],
      numberOfBoxes: [4, Validators.required],
      numberOfRetriesAllowed: [2, Validators.required]
    });
    this.simonConfigOpened = false;
    this.isInMemoryEdit = false;
    this.imagesAlreadyInTheMemory = [];
  }
}
