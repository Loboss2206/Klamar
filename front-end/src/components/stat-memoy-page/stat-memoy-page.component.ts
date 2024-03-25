import { Component } from '@angular/core';
import {titlePageComponent} from "../titlePage/titlePage.component";
import {StatQuestionComponent} from "../stat-question/stat-question.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";

@Component({
  selector: 'app-stat-memoy-page',
  standalone: true,
  imports: [
    titlePageComponent,
    StatQuestionComponent,
    ZoomSliderComponent
  ],
  templateUrl: './stat-memoy-page.component.html',
  styleUrl: './stat-memoy-page.component.scss'
})
export class StatMemoyPageComponent {

}
