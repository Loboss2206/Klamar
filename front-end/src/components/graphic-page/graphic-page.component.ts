import { Component, OnInit } from '@angular/core';
import {titlePageComponent} from "../titlePage/titlePage.component";
import {sortComponent} from "../sort/sort.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";
import {GraphicComponent} from "../graphic/graphic.component";
import {GraphicService} from "../../services/graphic.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../../services/user-service.service";
import {NgForOf} from "@angular/common";
import IGraphic from "../../interfaces/IGraphic";
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";
import {GenericButtonComponent} from "../genericButton/genericButton.component";


@Component({
  selector: 'app-graphic-page',
  standalone: true,
  imports: [
    titlePageComponent,
    sortComponent,
    ZoomSliderComponent,
    GraphicComponent,
    NgForOf,
    GenericButtonComponent,
    RouterLink,

  ],
  templateUrl: './graphic-page.component.html',
  styleUrl: './graphic-page.component.scss'
})
export class GraphicPageComponent implements OnInit{
  id : number | undefined
  chartIDs : string[] | undefined
  charts : IGraphic[] = []
  user ?: IUser | IAdmin
  constructor(private _graphicService : GraphicService , private _userService : UserService , private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.user = this._userService.getTheUser(this.id)
    this._userService.getCharts(this.id).subscribe(charts =>{
      this.chartIDs=charts
    })
    if (this.chartIDs) {
      for (let chartId of this.chartIDs) {
        this._graphicService.getGraphic(chartId).subscribe(chart => {
          if (chart) {
            this.charts.push(chart)
          }
        })
      }
    }

  }

}
