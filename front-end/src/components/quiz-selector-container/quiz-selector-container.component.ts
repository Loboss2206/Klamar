import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { QuizSelectorItemComponent } from '../quiz-selector-item/quiz-selector-item.component';
import Quiz from '../../interfaces/IQuiz';
import { QuizService } from '../../services/quiz-service.service';

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
export class QuizSelectorContainerComponent {
  quizzes: Quiz[] = [];

  constructor(private quizService: QuizService) {
    this.quizzes = [
      {
        title: 'Quiz géographie',
        imageUrl: 'https://previews.123rf.com/images/yupiramos/yupiramos2203/yupiramos220302216/183817525-mati%C3%A8re-scolaire-de-g%C3%A9ographie.jpg',
        questions: this.quizService.getQuestions()
      },
      {
        title: 'Quiz sport',
        imageUrl: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg?size=626&ext=jpg&ga=GA1.1.1457017613.1710413038&semt=sph',
        questions: this.quizService.getQuestions()
      },
      {
        title: 'Quiz acteurs',
        imageUrl: 'https://images.rtl.fr/~c/770v513/rtl/www/1076683-leonardo-dicaprio-est-l-un-des-acteurs-les-plus-payes-avec-45-millions-de-dollars-entre-2013-et-2014.jpg',
        questions: this.quizService.getQuestions()
      },
      {
        title: 'Quiz Henriette',
        imageUrl: 'https://www.pourquoidocteur.fr/media/article/COPY_istock-1213864843-1625666281.jpg',
        questions: this.quizService.getQuestions()
      }
    ];
  }
}
