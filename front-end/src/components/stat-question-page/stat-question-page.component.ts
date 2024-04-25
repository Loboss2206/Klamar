import {Component, OnInit} from '@angular/core';
import {titlePageComponent} from "../titlePage/titlePage.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";
import {ResultQuestionComponent} from "../result-question/result-question.component";
import {GraphicComponent} from "../graphic/graphic.component";
import {NgForOf} from "@angular/common";
import {GraphicService} from "../../services/graphic.service";
import {UserService} from "../../services/user-service.service";
import {ActivatedRoute} from "@angular/router";
import {StatsService} from "../../services/stats.service";
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";
import {stats} from "../../mocks/stats";
import IStats from "../../interfaces/IStats";
import {StatQuestionComponent} from "../stat-question/stat-question.component";

@Component({
  selector: 'app-stat-question-page',
  standalone: true,
  imports: [
    titlePageComponent,
    ZoomSliderComponent,
    ResultQuestionComponent,
    GraphicComponent,
    NgForOf,
    StatQuestionComponent
  ],
  templateUrl: './stat-question-page.component.html',
  styleUrl: './stat-question-page.component.scss'
})
export class StatQuestionPageComponent implements OnInit{
  id : number | undefined
  user ?: IUser | IAdmin
  statsId ?: number[]
  stats : IStats[] = []
  constructor(private _statsService : StatsService , private _userService : UserService , private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.user = this._userService.getTheUser(this.id)
    this._userService.getStats(this.id).subscribe(stats =>{
      this.statsId=stats
    })
    if (this.statsId) {
      for (let statId of this.statsId) {
        this._statsService.getStat(statId).subscribe(stat => {
          if (stat) {
            this.stats.push(stat)
          }
        })
      }
    }
  }
}
