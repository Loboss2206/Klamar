import {Component, OnInit} from '@angular/core';
import { QuestionComponent } from "../question/question.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import { QuizService } from "../../services/quiz-service.service";
import IQuestion from "../../interfaces/IQuestion";
import { FelicidadComponent } from "../felicidad/felicidad.component";
import { NavbarComponent } from "../navbar/navbar.component";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    QuestionComponent,
    NgForOf,
    FelicidadComponent,
    NgIf,
    NavbarComponent,
    AsyncPipe
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit{

  constructor(protected quizService: QuizService) {
  }

  ngOnInit() {
    this.quizService.init();

  }

}
