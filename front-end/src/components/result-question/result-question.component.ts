import {Component, Input} from '@angular/core';
import {StatQuestionComponent} from "../stat-question/stat-question.component";
import {QuestionComponent} from "../question/question.component";

@Component({
  selector: 'app-result-question',
  standalone: true,
  imports: [
    StatQuestionComponent,
    QuestionComponent
  ],
  templateUrl: './result-question.component.html',
  styleUrl: './result-question.component.scss'
})
export class ResultQuestionComponent {

  @Input() point ?: number
  @Input() maxPoint ?: number
  @Input() erreur ?: number
  @Input() indices ?: number
  @Input() temps ?: number

}
