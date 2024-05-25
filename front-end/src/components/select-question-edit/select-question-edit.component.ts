import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionService } from "../../services/question.service";
import { NgIf } from "@angular/common";
import IQuestion from 'src/interfaces/IQuestion';

@Component({
  selector: 'app-select-question-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './select-question-edit.component.html',
  styleUrl: './select-question-edit.component.scss'
})
export class SelectQuestionEditComponent {
  protected questionModificatorComponent: FormGroup;
  idQuestionToModify: string | null = this.route.snapshot.paramMap.get('id')
  imageUrlQuestion: any;
  imageUrlResponse1: any;
  imageUrlResponse2: any;
  imageUrlResponse3: any;
  imageUrlResponse4: any;
  imageBase64Question: any = "";
  imageBase64Response1: any = "";
  imageBase64Response2: any = "";
  imageBase64Response3: any = "";
  imageBase64Response4: any = "";


  constructor(private router: Router, protected formBuilder: FormBuilder, private questionService: QuestionService, private route: ActivatedRoute) {
    if ((Number(this.route.snapshot.paramMap.get('id')))) {
      let questionToModify = this.questionService.getQuestionById(Number(this.route.snapshot.paramMap.get('id'))) as IQuestion;
      console.log(questionToModify);
      const responsesAreImages = questionToModify.AreResponsesImages;

      let response1Value = '';
      let response2Value = '';
      let response3Value = '';
      let response4Value = '';

      if (responsesAreImages == true) {
        this.imageUrlResponse1 = questionToModify.responses[0];
        this.imageUrlResponse2 = questionToModify.responses[1];
        this.imageUrlResponse3 = questionToModify.responses[2];
        this.imageUrlResponse4 = questionToModify.responses[3];
        this.imageBase64Response1 = questionToModify.responses[0];
        this.imageBase64Response2 = questionToModify.responses[1];
        this.imageBase64Response3 = questionToModify.responses[2];
        this.imageBase64Response4 = questionToModify.responses[3];
      } else {
        response1Value = questionToModify.responses[0];
        response2Value = questionToModify.responses[1];
        response3Value = questionToModify.responses[2];
        response4Value = questionToModify.responses[3];
      }
      this.imageUrlQuestion = questionToModify.questionImage
      this.imageBase64Question = questionToModify.questionImage;

      this.questionModificatorComponent = this.formBuilder.group({

        question: [questionToModify.question, Validators.required],
        choicePicture: [questionToModify.AreResponsesImages, Validators.required],
        imageQuestion: "",
        imageResponse1: "",
        imageResponse2: "",
        imageResponse3: "",
        imageResponse4: "",
        reponse1: [response1Value, Validators.required],
        reponse2: [response2Value, Validators.required],
        reponse3: [response3Value, Validators.required],
        reponse4: [response4Value, Validators.required],
        indice1: [questionToModify.tips[0], Validators.required],
        indice2: [questionToModify.tips[1], Validators.required],
        categorie: [questionToModify.tags, Validators.required]
      });
    } else {
      this.questionModificatorComponent = this.formBuilder.group({});
    }
  }

  ngOnInit() {

  }
  isFormValid(): boolean {
    return this.questionModificatorComponent.valid;
  }


  navigateToSelectQuestion(): void {
    let newQuestion: IQuestion = {
      id: Number(this.route.snapshot.paramMap.get('id')),
      question: this.questionModificatorComponent.get('question')?.getRawValue(),
      questionImage: this.questionModificatorComponent.get('imageQuestion')?.getRawValue(),
      tips: [this.questionModificatorComponent.get('indice1')?.getRawValue(), this.questionModificatorComponent.get('indice2')?.getRawValue()],
      AreResponsesImages: this.questionModificatorComponent.get('choicePicture')?.getRawValue(),
      responses: [this.questionModificatorComponent.get('reponse1')?.getRawValue(), this.questionModificatorComponent.get('reponse2')?.getRawValue(), this.questionModificatorComponent.get('reponse3')?.getRawValue(), this.questionModificatorComponent.get('reponse4')?.getRawValue()],
      answer: this.questionModificatorComponent.get('reponse1')?.getRawValue(),
      tags: this.questionModificatorComponent.get('categorie')?.getRawValue(),
    };
    if (this.imageBase64Question != "") {
      newQuestion.questionImage = this.imageBase64Question;
    }
    if (this.imageBase64Response1 != "") {
      newQuestion.responses[0] = this.imageBase64Response1;
      newQuestion.answer = this.imageBase64Response1;
    }
    if (this.imageBase64Response2 != "") {
      newQuestion.responses[1] = this.imageBase64Response2;
    }
    if (this.imageBase64Response3 != "") {
      newQuestion.responses[2] = this.imageBase64Response3;
    }
    if (this.imageBase64Response4 != "") {
      newQuestion.responses[3] = this.imageBase64Response4;
    }
    this.questionService.modifyQuestion(newQuestion);
    setTimeout(() => {
      this.router.navigate(['/admin/selectQuestion']);
    }, 2000);
  }

  resizedImage(reader: FileReader, typeOfImage: string): void {
    const img = new Image();
    img.src = reader.result as string;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxWidth = 200; // taille maximale souhaitée
      const maxHeight = 200; // taille maximale souhaitée
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);

      // Récupérer l'image redimensionnée au format base64
      const resizedImageData = canvas.toDataURL('image/jpeg');
      if (typeOfImage === "imageUrlQuestion") {
        this.imageBase64Question = resizedImageData;
      } else if (typeOfImage === "imageUrlResponse1") {
        this.imageBase64Response1 = resizedImageData;
      } else if (typeOfImage === "imageUrlResponse2") {
        this.imageBase64Response2 = resizedImageData;
      } else if (typeOfImage === "imageUrlResponse3") {
        this.imageBase64Response3 = resizedImageData;
      } else if (typeOfImage === "imageUrlResponse4") {
        this.imageBase64Response4 = resizedImageData;
      }
    }
  }

  onFileSelected(event: any, imageUrl: any) {
    console.log(imageUrl)
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (imageUrl === "imageUrlQuestion") {
          this.imageUrlQuestion = reader.result;
          this.imageBase64Question = this.resizedImage(reader, "imageUrlQuestion");
        } else if (imageUrl === "imageUrlResponse1") {
          this.imageUrlResponse1 = reader.result;
          this.imageBase64Response1 = this.resizedImage(reader, "imageUrlResponse1");
        } else if (imageUrl === "imageUrlResponse2") {
          this.imageUrlResponse2 = reader.result;
          this.imageBase64Response2 = this.resizedImage(reader, "imageUrlResponse2");
        } else if (imageUrl === "imageUrlResponse3") {
          this.imageUrlResponse3 = reader.result;
          this.imageBase64Response3 = this.resizedImage(reader, "imageUrlResponse3");
        } else if (imageUrl === "imageUrlResponse4") {
          this.imageUrlResponse4 = reader.result;
          this.imageBase64Response4 = this.resizedImage(reader, "imageUrlResponse4");
        }
      }
    }
  }
}
