import {Component, OnInit} from '@angular/core';
import {titlePageComponent} from "../titlePage/titlePage.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";
import {ResultQuestionComponent} from "../result-question/result-question.component";
import {GraphicComponent} from "../graphic/graphic.component";
import {NgForOf} from "@angular/common";
import {UserService} from "../../services/user-service.service";
import {ActivatedRoute} from "@angular/router";
import {StatsService} from "../../services/stats.service";
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";
import IStats from "../../interfaces/IStats";
import {StatQuestionComponent} from "../stat-question/stat-question.component";
import {Subscription} from "rxjs";

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
export class StatQuestionPageComponent implements OnInit {
  id : number | undefined
  user ?: IUser | IAdmin
  stat ?: IStats
  statId ?: number
  constructor(private _statsService : StatsService , private _userService : UserService , private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.user = this._userService.getTheUser(this.id)
    this.statId = this._statsService.getTheStat()
    console.log("Momen"+this.statId)
    this._statsService.getStat(this.statId).subscribe(stat => {
      if (stat) {
        console.log('Stat:', stat);
        this.stat=stat
      } else {
        console.log('Stat not found');
      }
    });
  }
}
