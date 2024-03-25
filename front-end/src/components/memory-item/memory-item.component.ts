import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgClass, NgIf],
  selector: 'app-memory-item',
  templateUrl: './memory-item.component.html',
  styleUrls: ['./memory-item.component.scss']
})
export class MemoryItemComponent {
  isFlipped: boolean = false;

  @Input() picURL!: string;

  constructor() { }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}
