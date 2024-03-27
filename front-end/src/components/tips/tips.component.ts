import { Component } from '@angular/core';
import { ButtonComponent } from "../quizButton/button.component";
import { GenericButtonComponent } from '../genericButton/genericButton.component';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [
    ButtonComponent,
    GenericButtonComponent
  ],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.scss'
})
export class TipsComponent {

}
