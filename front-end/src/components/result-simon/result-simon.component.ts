import { Component, Input } from '@angular/core';
import { StatQuestionComponent } from "../stat-question/stat-question.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-result-simon',
  standalone: true,
  imports: [
    StatQuestionComponent,
    NgIf
  ],
  templateUrl: './result-simon.component.html',
  styleUrl: './result-simon.component.scss'
})
export class ResultSimonComponent {

  @Input() taille?: number
  @Input() erreur?: number
  @Input() indices?: number
  @Input() temps?: number
  @Input() couleur?: number
  @Input() wasPassed: boolean | undefined


}
