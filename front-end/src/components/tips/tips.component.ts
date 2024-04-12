import {booleanAttribute, Component, Input} from '@angular/core';
import { ButtonComponent } from "../quizButton/button.component";
import { GenericButtonComponent } from '../genericButton/genericButton.component';
import {NgIf, NgOptimizedImage} from "@angular/common";
import IUser from "../../interfaces/IUser";

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

  @Input({transform: booleanAttribute}) canBeClicked!: boolean

  showHint: boolean = false;

  openATip() {
    this.showHint = true;
  }

  closeATip() {
    this.showHint = false;
  }
}
