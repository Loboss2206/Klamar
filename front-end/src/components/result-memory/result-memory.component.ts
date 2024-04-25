import {Component, Input} from '@angular/core';
import {StatQuestionComponent} from "../stat-question/stat-question.component";

@Component({
  selector: 'app-result-memory',
  standalone: true,
    imports: [
        StatQuestionComponent
    ],
  templateUrl: './result-memory.component.html',
  styleUrl: './result-memory.component.scss'
})
export class ResultMemoryComponent {

  @Input() hauteur ?: number
  @Input() erreur ?: number
  @Input() indices ?: number
  @Input() temps ?: number
  @Input() largeur ?: number
}
