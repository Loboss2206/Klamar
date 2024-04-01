import { Component, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgClass, NgIf],
  selector: 'app-memory-item',
  templateUrl: './memory-item.component.html',
  styleUrls: ['./memory-item.component.scss']
})
export class MemoryItemComponent {
  isFlipped: boolean = false;
  isInactive: boolean = false;

  @Input() picURL!: string;
  @Output() onFlip: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  clickOnCard() {
    this.onFlip.emit();
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}