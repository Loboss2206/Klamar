import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import {NgIf} from "@angular/common";

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


  constructor(private router: Router, protected formBuilder: FormBuilder, _questionService: QuestionService, private route: ActivatedRoute) {
    let questionToModify = _questionService.getQuestionById(this.idQuestionToModify)

    const responsesAreImages = questionToModify?.AreResponsesImages === true;

    let response1Value = '';
    let response2Value = '';
    let response3Value = '';
    let response4Value = '';

    if (responsesAreImages) {
      this.imageUrlResponse1 = questionToModify?.responses[0]
      this.imageUrlResponse2 = questionToModify?.responses[1]
      this.imageUrlResponse3 = questionToModify?.responses[2]
      this.imageUrlResponse4 = questionToModify?.responses[3]
    } else {
      response1Value = questionToModify?.responses[0] || '';
      response2Value = questionToModify?.responses[1] || '';
      response3Value = questionToModify?.responses[2] || '';
      response4Value = questionToModify?.responses[3] || '';
    }
    this.imageUrlQuestion = questionToModify?.questionImage

    this.questionModificatorComponent = this.formBuilder.group({

      question: [questionToModify?.question, Validators.required],
      choicePicture: [questionToModify?.AreResponsesImages ? 'true' : 'false', Validators.required],
      imageQuestion: "",
      imageResponse1: "",
      imageResponse2: "",
      imageResponse3: "",
      imageResponse4: "",
      reponse1: [response1Value, Validators.required],
      reponse2: [response2Value, Validators.required],
      reponse3: [response3Value, Validators.required],
      reponse4: [response4Value, Validators.required],
      indice1: [questionToModify?.tips[0], Validators.required],
      indice2: [questionToModify?.tips[1], Validators.required],
      categorie: [questionToModify?.tags, Validators.required]
    });
  }

  isFormValid(): boolean {
    return this.questionModificatorComponent.valid;
  }


  navigateToSelectQuestion(): void {
    this.router.navigate(['/selectQuestion']);
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
        } else if (imageUrl === "imageUrlResponse1") {
          this.imageUrlResponse1 = reader.result;
        } else if (imageUrl === "imageUrlResponse2") {
          this.imageUrlResponse2 = reader.result;
        } else if (imageUrl === "imageUrlResponse3") {
          this.imageUrlResponse3 = reader.result;
        } else if (imageUrl === "imageUrlResponse4") {
          this.imageUrlResponse4 = reader.result;
        }
      }
    }
  }
}
