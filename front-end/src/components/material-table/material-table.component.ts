import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {GenericButtonComponent} from "../genericButton/genericButton.component";
import {QuizService} from "../../services/quiz-service.service";
import IQuiz from "../../interfaces/IQuiz";

@Component({
  selector: 'app-material-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    GenericButtonComponent,
    NgClass,
    SlicePipe
  ],
  templateUrl: './material-table.component.html',
  styleUrl: './material-table.component.scss'
})

export class MaterialTableComponent implements OnInit, OnChanges {

  @Input() headers: string[] = [];
  @Input() actions: any[] = [];
  @Input() otherElements?: any[] = [];
  @Input() type: "quizzes" | "questions" | "other" = "quizzes";
  protected elements: any[] = this.type === "other" ? this.otherElements ? this.otherElements : [] : [];

  constructor(private quizService: QuizService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.elements = this.type === "other" ? this.otherElements ? this.otherElements : [] : [];
    if (this.type === "quizzes") {
      this.quizService.getQuizzesObservable().subscribe(quizzes => {
        this.elements = [];
        for (let quiz of quizzes) {
          let quizToDisplay = {
            image: quiz.imageUrl,
            title: quiz.title,
            quizDescription: quiz.quizDescription,
            information: "Questions : " + quiz.questions.length + "  |  Simon : " + (quiz.specials.some((special: {
              name: string;
            }) => special.name === "Simon") ? "Oui" : "Non") + "  |  Memory: " + (quiz.specials.some(special => special.name === "Memory") ? "Oui" : "Non"),
            id: quiz.id
          }
          this.elements.push(quizToDisplay);
        }
      })
    } else if (this.type === "questions") {
      //TODO MOMEN
    }
  }

  protected readonly Object = Object;
  @Output() callback = new EventEmitter<any>();

  cellClick(cell: any, action: any) {
   this.callback.emit([cell.id, action]);
  }
}
