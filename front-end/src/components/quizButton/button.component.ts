import { Component, Input, SimpleChanges } from '@angular/core';
import { NgClass, NgIf, NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-quizButton',
  standalone: true,
  imports: [
    NgClass,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() isStatsButton: boolean = false;
  @Input() color?: { correct: boolean; wrong: boolean };
  @Input() img?: string = '';

  buttonText: string = '';
  @Input() lite!: boolean;

  constructor() {
  }

}
