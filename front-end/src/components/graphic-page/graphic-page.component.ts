import { Component, OnInit } from '@angular/core';
import {titlePageComponent} from "../titlePage/titlePage.component";
import {sortComponent} from "../sort/sort.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";
import {GraphicComponent} from "../graphic/graphic.component";


@Component({
  selector: 'app-graphic-page',
  standalone: true,
  imports: [
    titlePageComponent,
    sortComponent,
    ZoomSliderComponent,
    GraphicComponent,

  ],
  templateUrl: './graphic-page.component.html',
  styleUrl: './graphic-page.component.scss'
})
export class GraphicPageComponent implements OnInit{
  ngOnInit(): void {
  }

}
