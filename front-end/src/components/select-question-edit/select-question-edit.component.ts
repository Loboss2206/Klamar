import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import {NgIf} from "@angular/common";
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
  idQuestionToModify: string | null = this.route.snapshot.paramMap.get('id');
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

  getTheRightAnswer(question: IQuestion): string {
    let responses = question.responses;
    let answer = question.answer;
    let diff = responses.filter((response) => response === answer);
    let answerIndex = responses.indexOf(diff[0]);
    return (answerIndex + 1).toString();
  }

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
        choicePicture: [String
        (questionToModify.AreResponsesImages), Validators.required],
        imageQuestion: questionToModify.questionImage,
        imageResponse1: questionToModify.responses[0],
        imageResponse2: questionToModify.responses[1],
        imageResponse3: questionToModify.responses[2],
        imageResponse4: questionToModify.responses[3],
        reponse1: response1Value,
        reponse2: response2Value,
        reponse3: response3Value,
        reponse4: response4Value,
        indice1: [questionToModify.tips[0], Validators.required],
        indice2: [questionToModify.tips[1], Validators.required],
        categorie: [questionToModify.tags.join(","), Validators.required],
        correctAnswer: [this.getTheRightAnswer(questionToModify), Validators.required]
      });
    } else {
      this.idQuestionToModify = null;
      this.questionModificatorComponent = this.formBuilder.group({
        question: ['', Validators.required],
        choicePicture: ['', Validators.required],
        imageQuestion: "",
        imageResponse1: "",
        imageResponse2: "",
        imageResponse3: "",
        imageResponse4: "",
        reponse1: "",
        reponse2: "",
        reponse3: "",
        reponse4: "",
        indice1: "",
        indice2: "",
        categorie: ['', Validators.required],
        correctAnswer: "1"
      });
    }
  }

  isFormValid(): boolean {
    return this.questionModificatorComponent.valid;
  }

  getTheQuestionOfAnswerId(answerId: number, isImage: boolean): string {
    if (!isImage) {
      if (answerId == 1) {
        return this.questionModificatorComponent.get('reponse1')?.value;
      } else if (answerId == 2) {
        return this.questionModificatorComponent.get('reponse2')?.value;
      } else if (answerId == 3) {
        return this.questionModificatorComponent.get('reponse3')?.value;
      } else if (answerId == 4) {
        return this.questionModificatorComponent.get('reponse4')?.value;
      }
    }else {
      console.log("isImage")
      if (answerId == 1) {
        console.log("1", answerId)
        return this.questionModificatorComponent.get('imageResponse1')?.value;
      } else if (answerId == 2) {
        console.log("2", answerId)
        return this.questionModificatorComponent.get('imageResponse2')?.value;
      } else if (answerId == 3) {
        console.log("3", answerId)
        return this.questionModificatorComponent.get('imageResponse3')?.value;
      } else if (answerId == 4) {
        console.log("4", answerId)
        return this.questionModificatorComponent.get('imageResponse4')?.value;
      }
    }
    return "";
  }

  navigateToSelectQuestion(): void {
    let newQuestion: IQuestion = {
      id: Number(this.route.snapshot.paramMap.get('id')) || -1,
      question: this.questionModificatorComponent.get('question')?.getRawValue(),
      questionImage: this.questionModificatorComponent.get('imageQuestion')?.getRawValue(),
      tips: [this.questionModificatorComponent.get('indice1')?.getRawValue(), this.questionModificatorComponent.get('indice2')?.getRawValue()],
      AreResponsesImages: this.questionModificatorComponent.get('choicePicture')?.getRawValue().toString() === "true",
      responses: [this.questionModificatorComponent.get('reponse1')?.getRawValue(), this.questionModificatorComponent.get('reponse2')?.getRawValue(), this.questionModificatorComponent.get('reponse3')?.getRawValue(), this.questionModificatorComponent.get('reponse4')?.getRawValue()],
      answer:  this.getTheQuestionOfAnswerId(parseInt(this.questionModificatorComponent.get('correctAnswer')?.getRawValue()), this.questionModificatorComponent.get('choicePicture')?.getRawValue().toString() === "true"),
      tags: this.questionModificatorComponent.get('categorie')?.getRawValue().split(",")
    };
    if (this.imageBase64Question != "") {
      newQuestion.questionImage = this.imageBase64Question;
    }
    if (this.imageBase64Response1 != "") {
      newQuestion.responses[0] = this.imageBase64Response1;
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
    console.log(newQuestion);
    if (newQuestion.id == -1) {
      this.questionService.createNewQuestion(newQuestion);
    } else {
      this.questionService.modifyQuestion(newQuestion);
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
          this.imageBase64Question = reader.result;
        } else if (imageUrl === "imageUrlResponse1") {
          this.imageUrlResponse1 = reader.result;
          this.imageBase64Response1 = reader.result;
        } else if (imageUrl === "imageUrlResponse2") {
          this.imageUrlResponse2 = reader.result;
          this.imageBase64Response2 = reader.result;
        } else if (imageUrl === "imageUrlResponse3") {
          this.imageUrlResponse3 = reader.result;
          this.imageBase64Response3 = reader.result;
        } else if (imageUrl === "imageUrlResponse4") {
          this.imageUrlResponse4 = reader.result;
          this.imageBase64Response4 = reader.result;
        }
      }
    }
  }
}
