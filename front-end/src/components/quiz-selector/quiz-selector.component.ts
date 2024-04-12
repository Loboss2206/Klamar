import { Component, EventEmitter, Output } from '@angular/core';
import { TagsSelectorComponent } from '../tags-selector/tags-selector.component';
import { SearchQuizSelectorComponent } from '../search-quiz-selector/search-quiz-selector.component';
import { QuizSelectorContainerComponent } from '../quiz-selector-container/quiz-selector-container.component';
import {QuizService} from "../../services/quiz-service.service";
import IQuiz from "../../interfaces/IQuiz";

@Component({
    selector: 'app-quiz-selector',
    standalone: true,
    imports: [
        TagsSelectorComponent,
        SearchQuizSelectorComponent,
        QuizSelectorContainerComponent
    ],
    templateUrl: './quiz-selector.component.html',
    styleUrl: './quiz-selector.component.scss'
})

export class QuizSelectorComponent {

  quizzes: IQuiz[] = [];


  constructor(private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();
  }

  searchQuizzes(searchTerm: string) {
    this.quizzes = this.quizService.searchQuizzes(searchTerm);
  }

}
