import { Component } from '@angular/core';
import {StatQuestionComponent} from "../stat-question/stat-question.component";
import {titlePageComponent} from "../titlePage/titlePage.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";
import {SimonGameComponent} from "../simon-game/simon-game.component";
import {NgForOf} from "@angular/common";
import {ResultQuestionComponent} from "../result-question/result-question.component";
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";
import IStats from "../../interfaces/IStats";
import {StatsService} from "../../services/stats-service";
import {UserService} from "../../services/user-service.service";
import {ActivatedRoute} from "@angular/router";
import {ResultSimonComponent} from "../result-simon/result-simon.component";

@Component({
  selector: 'app-stat-simon-page',
  standalone: true,
  imports: [
    StatQuestionComponent,
    titlePageComponent,
    ZoomSliderComponent,
    SimonGameComponent,
    NgForOf,
    ResultQuestionComponent,
    ResultSimonComponent
  ],
  templateUrl: './stat-simon-page.component.html',
  styleUrl: './stat-simon-page.component.scss'
})
export class StatSimonPageComponent {
  id : number | undefined
  user ?: IUser | IAdmin
  statsId ?: number
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
      this._statsService.getStat(this.statsId).subscribe(stat => {
        if (stat) {
          this.stats.push(stat)
        }
      })
    }
  }
}
