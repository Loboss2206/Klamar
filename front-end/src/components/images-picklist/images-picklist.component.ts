import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { NgForOf } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-images-picklist',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    NgForOf,
    CdkDragHandle
  ],
  templateUrl: './images-picklist.component.html',
  styleUrl: './images-picklist.component.scss'
})
export class ImagesPicklistComponent implements OnInit {
  @Input() allImages: string[] = [];
  @Input() imageAlreadyOnTheQuiz: string[] = [];

  imagesOrder: string[] = [];
  availableImage: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  imagesInTheQuiz: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);


  public kanban: Kanban = new Kanban('Quiz Editor', [
    new KanbanCol('Images disponibles', '1', []),
    new KanbanCol('Images dans le quiz ', '2', [])
  ]);

  constructor(private sharedService: SharedService) { }

  public ngOnInit(): void {
    this.availableImage.subscribe((tasks) => {
      this.kanban.col[0].images = tasks;
    });

    this.imagesInTheQuiz.subscribe((tasks) => {
      this.kanban.col[1].images = tasks;
    });
    this.availableImage.next(this.allImages.filter((question) => !this.imageAlreadyOnTheQuiz.includes(question)));
    this.imagesInTheQuiz.next(this.imageAlreadyOnTheQuiz);
  }

  public dropGrid(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.kanban.col, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.imagesOrder = this.kanban.col[1].images;
    this.sharedService.setImagesOrder(this.imagesOrder); // Update the shared service
  }
}

class Kanban {
  constructor(public name: string, public col: KanbanCol[]) { }
}

class KanbanCol {
  constructor(public name: string, public id: string, public images: string[]) { }
}


