import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { MemoryItemComponent } from "../memory-item/memory-item.component";
import { QueryList, ViewChildren } from "@angular/core";
import { Router } from "@angular/router";
import { QuizService } from "../../services/quiz-service.service";
import { UserService } from "../../services/user-service.service";
import { HostListener } from "@angular/core";
import { Time } from 'tone';

@Component({
  standalone: true,
  selector: 'app-memory-container',
  templateUrl: './memory-container.component.html',
  styleUrls: ['./memory-container.component.scss'],
  imports: [
    MemoryItemComponent,
    NgForOf
  ]
})

export class MemoryContainerComponent {
  @ViewChildren(MemoryItemComponent) memoryItems!: QueryList<MemoryItemComponent>;

  private initialFlip = true;
  private hintsGiven = false;

  rules: any;
  startGame = true;
  pics: string[] = [];
  numberOfError: number = 0;
  timeBeforeSwitching: number = 1;
  timeBeforeHints: number = 5;
  lastCardClickedTime: number = 0;
  lastUserActionTime: number = Date.now();

  @HostListener('document:click', ['$event'])
  @HostListener('document:keypress', ['$event'])
  userActionListener(event: MouseEvent | KeyboardEvent): void {
    this.lastUserActionTime = Date.now();
  }

  ngOnInit(): void {
    this.startInactivityCheck();
    this.pics = this.quizService.getPicsMemory();
    this.timeBeforeSwitching = this.userService.getUserConfig().memory.timeBeforeSwitching;
    this.timeBeforeHints = this.userService.getUserConfig().memoryHints.timeBeforeHints;
    this.pics = this.pics.concat(this.pics);
    this.shuffleArray(this.pics);
    this.initialFlip = true;
  }

  ngAfterViewChecked(): void {
    if (this.initialFlip) {
      setTimeout(() => {
        this.memoryItems.forEach((item) => {
          item.setFlipped(true);
        });

        setTimeout(() => {
          this.memoryItems.forEach((item) => {
            item.setFlipped(false);
          });

          this.initialFlip = false;
        }, 2000);
      });
      this.initialFlip = false;
    }
  }

  startInactivityCheck(): void {
    setInterval(() => {
      const elapsedTime = Date.now() - this.lastCardClickedTime;
      if (elapsedTime >= (this.timeBeforeHints * 1000) && !this.hintsGiven) {
        const flippedItems = this.getFlippedItemsNotInactive();
        if (flippedItems.length === 1) {
          const notFlippedItems = this.getNotFlippedItems();
          if (notFlippedItems.length > 1) {
            this.giveHints();
            this.hintsGiven = true;
          }
        }
      }
    }, 1);
  }

  constructor(private router: Router, private quizService: QuizService, private userService: UserService) {
  }

  getFlippedItems(): MemoryItemComponent[] {
    return this.memoryItems.filter(item => item.isFlipped);
  }

  getNotFlippedItems(): MemoryItemComponent[] {
    return this.memoryItems.filter(item => !item.isFlipped);
  }

  getFlippedItemsNotInactive(): MemoryItemComponent[] {
    return this.memoryItems.filter(item => item.isFlipped && !item.isInactive);
  }

  verifyFlippedItems() {
    let flippedItemsNotInactive = this.getFlippedItemsNotInactive();
    if (flippedItemsNotInactive.length === 2) {
      this.hintsGiven = false;
      if (flippedItemsNotInactive[0].picURL === flippedItemsNotInactive[1].picURL) {
        flippedItemsNotInactive.forEach((item) => {
          setTimeout(() => {
            item.isInactive = true;
            item.setHidden(true);

            if (this.isFinished()) {
              this.quizService.endMemoryGame();
            }
          }, (this.timeBeforeSwitching * 1000));
        });
      } else {
        this.getNotFlippedItems().forEach((item) => {
          item.isInactive = true;
        });

        setTimeout(() => {
          flippedItemsNotInactive.forEach((item) => {
            this.flipItem(this.memoryItems.toArray().indexOf(item));
          });

          this.getNotFlippedItems().forEach((item) => {
            item.isInactive = false;
          });
        }, (this.timeBeforeSwitching * 1000));
      }

      this.memoryItems.forEach((item) => {
        item.setHighlightCard(false);
      });
    }
  }


  flipItem(index: number) {
    let item = this.memoryItems.toArray()[index];
    if (!item.isInactive) {
      item.setFlipped(!item.isFlipped);
      this.lastCardClickedTime = Date.now();
    }
  }

  updateFlippedItems(index: any) {
    const flippedItems = this.getFlippedItemsNotInactive();

    if (flippedItems.length === 1) {
      this.startInactivityCheck();
    }

    if (flippedItems.length < 2) {
      if (!this.memoryItems.toArray()[index].isFlipped) {
        this.flipItem(index);
      }
      this.verifyFlippedItems();
    }
  }


  giveHints() {
    let MemoryItemComponent = this.getFlippedItemsNotInactive()[0];
    this.memoryItems.forEach((item) => {
      if (item.picURL === MemoryItemComponent.picURL && MemoryItemComponent !== item) {
        let index = this.memoryItems.toArray().indexOf(item);
        item.setHighlightCard(true);
        if (this.getNotFlippedItems().length > 1) {
          let item2 = this.secondCardToHighlight(index, 4);
          if (item2 !== null) {
            item2.setHighlightCard(true);
          }
        }
      }
    });
  }

  secondCardToHighlight(index: number, size: number): MemoryItemComponent | null {
    const memoryItems = this.memoryItems.toArray();

    if (index % size !== 0 && !memoryItems[index - 1].isHidden && !memoryItems[index - 1].isFlipped) {
      return memoryItems[index - 1];
    }

    if (index % size !== size - 1 && !memoryItems[index + 1].isHidden && !memoryItems[index + 1].isFlipped) {
      return memoryItems[index + 1];
    }

    if (index >= size && !memoryItems[index - size].isHidden && !memoryItems[index - size].isFlipped) {
      return memoryItems[index - size];
    }

    if (index < memoryItems.length - size && !memoryItems[index + size].isHidden && !memoryItems[index + size].isFlipped) {
      return memoryItems[index + size];
    }

    let randomIndex = Math.floor(Math.random() * memoryItems.length);
    while (memoryItems[randomIndex].isHidden || memoryItems[randomIndex].isFlipped || randomIndex === index && this.getNotFlippedItems().length > 1) {
      randomIndex = Math.floor(Math.random() * memoryItems.length);
    }

    return memoryItems[randomIndex];
  }

  isFinished() {
    return this.memoryItems.toArray().every(item => item.isInactive);
  }

  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
