import { Component, Input, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../quizButton/button.component';
import { ZoomSliderComponent } from '../zoomSlider/zoomSlider.component';
import { textInputComponent } from '../textInput/textInput.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { GenericButtonComponent } from '../genericButton/genericButton.component';


@Component({
  selector: 'app-userCreator',
  standalone: true,
  imports: [
    ButtonComponent,
    ZoomSliderComponent, textInputComponent, NavbarComponent,
    GenericButtonComponent
  ],
  templateUrl: './userCreator.component.html',
  styleUrl: './userCreator.component.scss'
})
export class UserCreatorComponent {


  constructor() {
  }

}
