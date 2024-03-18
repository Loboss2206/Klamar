import { Component } from '@angular/core';
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.scss'
})
export class TipsComponent {

}
