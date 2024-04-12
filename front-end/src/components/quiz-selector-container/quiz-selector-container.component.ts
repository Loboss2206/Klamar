import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {QuizSelectorItemComponent} from '../quiz-selector-item/quiz-selector-item.component';
import IQuiz from '../../interfaces/IQuiz';
import {QuizService} from '../../services/quiz-service.service';
import {Router} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-quiz-selector-container',
  templateUrl: './quiz-selector-container.component.html',
  styleUrls: ['./quiz-selector-container.component.scss'],
  imports: [
    QuizSelectorItemComponent,
    NgForOf
  ]
})
export class QuizSelectorContainerComponent implements OnInit {
  @Input() quizzes: IQuiz[] = [];

  constructor(private quizService: QuizService, private router: Router) {
  }

  ngOnInit(): void {
  }

  defineQuiz(quizId: number) {
    this.quizService.restartQuiz();
    this.quizService.setQuiz(quizId);
    this.router.navigate(['/quiz']);
  }
}
