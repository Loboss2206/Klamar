import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {QuizService} from "../../services/quiz-service.service";

@Component({
  selector: 'app-felicidad',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './felicidad.component.html',
  styleUrl: './felicidad.component.scss'
})
export class FelicidadComponent {
  @Output() triggerRestart = new EventEmitter<unknown>();

  constructor(protected quizService: QuizService){
  }

  restartQuiz() {
    this.quizService.restartQuiz();
    this.triggerRestart.emit();
  }
}
