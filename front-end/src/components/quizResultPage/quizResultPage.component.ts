import { Component, Input, SimpleChanges } from '@angular/core';
import { sortComponent } from '../sort/sort.component';
import { titlePageComponent } from '../titlePage/titlePage.component';
import { quizResultBoxComponent } from '../quizResultBox/quizResultBox.component';


@Component({
  selector: 'app-quizResultPage',
  standalone: true,
  imports: [
    sortComponent,
    titlePageComponent,
    quizResultBoxComponent
  ],
  templateUrl: './quizResultPage.component.html',
  styleUrl: './quizResultPage.component.scss'
})
export class quizResultPageComponent {


  constructor() {
  }

}
