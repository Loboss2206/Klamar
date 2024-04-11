import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {NgForOf} from "@angular/common";
import IQuestion from "../../interfaces/IQuestion";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-questions-picklist',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    NgForOf,
    CdkDragHandle
  ],
  templateUrl: './questions-picklist.component.html',
  styleUrl: './questions-picklist.component.scss'
})
export class QuestionsPicklistComponent implements OnInit {
  @Input() allQuestions: IQuestion[] = [];
  @Input() questionsAlreadyInTheQuiz: IQuestion[] = [];

  questionsOrder: IQuestion[] = [];
  availableQuestions: BehaviorSubject<IQuestion[]> = new BehaviorSubject<IQuestion[]>([]);
  questionsInTheQuiz: BehaviorSubject<IQuestion[]> = new BehaviorSubject<IQuestion[]>([]);


  public kanban: Kanban = new Kanban('Quiz Editor', [
    new KanbanCol('Questions disponibles', '1', []),
    new KanbanCol('Questions dans le quiz ', '2', [])
  ]);

  constructor() {}

  public ngOnInit(): void {
    this.availableQuestions.subscribe((questions) => {
      this.kanban.col[0].questions = questions;
    });

    this.questionsInTheQuiz.subscribe((questions) => {
      this.kanban.col[1].questions = questions;
    });
    this.availableQuestions.next(this.allQuestions.filter((question) => !this.questionsAlreadyInTheQuiz.includes(question)));
    this.questionsInTheQuiz.next(this.questionsAlreadyInTheQuiz);
  }

  public dropGrid(event: CdkDragDrop<IQuestion[]>): void {
    moveItemInArray(this.kanban.col, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<IQuestion[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.questionsOrder = this.kanban.col[1].questions;
  }
}

class Kanban {
  constructor(public name: string, public col: KanbanCol[]) {}
}

class KanbanCol {
  constructor(public name: string, public id: string, public questions: IQuestion[]) {}
}


