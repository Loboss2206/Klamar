import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-stat-question',
  standalone: true,
  imports: [],
  templateUrl: './stat-question.component.html',
  styleUrl: './stat-question.component.scss'
})
export class StatQuestionComponent {

  @Input() erreur ?: number
  @Input() indices ?: number
  @Input() temps ?: number




}
