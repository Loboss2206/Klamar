import {Component} from '@angular/core';
import {SearchQuizSelectorComponent} from '../search-quiz-selector/search-quiz-selector.component';
import {QuizSelectorContainerComponent} from '../quiz-selector-container/quiz-selector-container.component';
import {QuizService} from "../../services/quiz-service.service";
import IQuiz from "../../interfaces/IQuiz";

@Component({
  selector: 'app-quiz-selector',
  standalone: true,
  imports: [
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
    this.quizService.getQuizzesObservable().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }

  searchQuizzes(searchTerm: string) {
    this.quizService.searchQuizzes(searchTerm);
  }

}
