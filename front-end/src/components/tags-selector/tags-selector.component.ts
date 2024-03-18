import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz-service.service';
import { NgForOf } from "@angular/common";

@Component({
  standalone: true,
  imports: [
    NgForOf
  ],
  selector: 'app-tags-selector',
  templateUrl: './tags-selector.component.html',
  styleUrls: ['./tags-selector.component.scss']
})

export class TagsSelectorComponent {
  tags: string[] = [];

  constructor(private quizService: QuizService) {
    this.tags = this.quizService.getTags();
  }
}
