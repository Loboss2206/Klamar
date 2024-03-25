import { Component } from '@angular/core';
import {titlePageComponent} from "../titlePage/titlePage.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";
import {ResultQuestionComponent} from "../result-question/result-question.component";

@Component({
  selector: 'app-stat-question-page',
  standalone: true,
  imports: [
    titlePageComponent,
    ZoomSliderComponent,
    ResultQuestionComponent
  ],
  templateUrl: './stat-question-page.component.html',
  styleUrl: './stat-question-page.component.scss'
})
export class StatQuestionPageComponent {

}
