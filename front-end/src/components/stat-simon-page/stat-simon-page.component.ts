import { Component } from '@angular/core';
import {StatQuestionComponent} from "../stat-question/stat-question.component";
import {titlePageComponent} from "../titlePage/titlePage.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";
import {SimonGameComponent} from "../simon-game/simon-game.component";

@Component({
  selector: 'app-stat-simon-page',
  standalone: true,
  imports: [
    StatQuestionComponent,
    titlePageComponent,
    ZoomSliderComponent,
    SimonGameComponent
  ],
  templateUrl: './stat-simon-page.component.html',
  styleUrl: './stat-simon-page.component.scss'
})
export class StatSimonPageComponent {

}
