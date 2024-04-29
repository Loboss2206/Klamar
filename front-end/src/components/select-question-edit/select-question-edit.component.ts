import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {QuestionService} from "../../services/question.service";

@Component({
  selector: 'app-select-question-edit',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './select-question-edit.component.html',
  styleUrl: './select-question-edit.component.scss'
})
export class SelectQuestionEditComponent {
  protected questionModificatorComponent: FormGroup;
  idQuestionToModify: string | null = sessionStorage.getItem("questionToModify");

  constructor(private router: Router, protected formBuilder: FormBuilder, private _questionService: QuestionService) {
    let questionToModify = _questionService.getQuestionById(this.idQuestionToModify)

    const responsesAreImages = questionToModify?.AreResponsesImages === true;

    let response1Value = '';
    let response2Value = '';
    let response3Value = '';
    let response4Value = '';

    if (!responsesAreImages) {
      response1Value = questionToModify?.responses[0] || '';
      response2Value = questionToModify?.responses[1] || '';
      response3Value = questionToModify?.responses[2] || '';
      response4Value = questionToModify?.responses[3] || '';
    }

      this.questionModificatorComponent = this.formBuilder.group({

        question: [questionToModify?.question, Validators.required],
        choicePicture: [questionToModify?.AreResponsesImages ? 'true' : 'false', Validators.required],
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
}
