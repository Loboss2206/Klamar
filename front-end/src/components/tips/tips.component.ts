import {Component} from '@angular/core';
import { ButtonComponent } from "../quizButton/button.component";
import { GenericButtonComponent } from '../genericButton/genericButton.component';
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [
    ButtonComponent,
    GenericButtonComponent,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.scss'
})
export class TipsComponent {

  showHint: boolean = false;

  openATip() {
    this.showHint = true;
  }

  closeATip() {
    this.showHint = false;
  }
}
