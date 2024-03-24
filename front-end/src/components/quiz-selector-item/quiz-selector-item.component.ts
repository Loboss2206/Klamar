import { Component, Input } from '@angular/core';
import IQuiz from '../../interfaces/IQuiz'; // Assurez-vous que le chemin d'import est correct

@Component({
  standalone: true,
  selector: 'app-quiz-selector-item',
  templateUrl: './quiz-selector-item.component.html',
  styleUrls: ['./quiz-selector-item.component.scss']
})
export class QuizSelectorItemComponent {
  @Input() quiz!: IQuiz;

  constructor() { }
}
