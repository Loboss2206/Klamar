import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControlName } from '@angular/forms';


@Component({
  selector: 'app-textInput',
  standalone: true,
  imports: [

  ],
  templateUrl: './textInput.component.html',
  styleUrl: './textInput.component.scss'
})
export class textInputComponent {
  @Input() text!: string;
  @Input() nameFormControl: string | undefined;

  constructor() {
  }

}
