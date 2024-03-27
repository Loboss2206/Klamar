import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonComponent} from "../quizButton/button.component";
import {QuizService} from "../../services/quiz-service.service";
import {Router} from "@angular/router";

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

  constructor(protected quizService: QuizService, private router: Router) {
  }

  restartQuiz() {
    this.quizService.restartQuiz();
    this.router.navigate(['/quiz']);
  }
}
