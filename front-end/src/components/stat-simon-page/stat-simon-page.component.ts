import {Component, OnInit} from '@angular/core';
import {StatQuestionComponent} from "../stat-question/stat-question.component";
import {titlePageComponent} from "../titlePage/titlePage.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";
import {NgForOf} from "@angular/common";
import {ResultQuestionComponent} from "../result-question/result-question.component";
import IUser from "../../interfaces/IUser";
import IStats from "../../interfaces/IStats";
import {StatsService} from "../../services/stats.service";
import {UserService} from "../../services/user-service.service";
import {ActivatedRoute} from "@angular/router";
import {ResultSimonComponent} from "../result-simon/result-simon.component";
import {SimonForStatComponent} from "../simon-for-stat/simon-for-stat.component";


@Component({
  selector: 'app-stat-simon-page',
  standalone: true,
  imports: [
    StatQuestionComponent,
    titlePageComponent,
    ZoomSliderComponent,
    NgForOf,
    ResultQuestionComponent,
    ResultSimonComponent,
    SimonForStatComponent,
  ],
  templateUrl: './stat-simon-page.component.html',
  styleUrl: './stat-simon-page.component.scss'
})
export class StatSimonPageComponent implements OnInit{
  id : number | undefined
  user ?: IUser
  statId ?: number
  stat ?: IStats
  constructor(private _statsService : StatsService , private _userService : UserService , private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.user = this._userService.getTheUserNonAdmin(this.id)
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

  get tailleFinalSimon(): number {
    console.log(this.stat?.simonStats?.nombreDeCouleurs + "NBCOLORFKJNHUECENKKE")
    return this.stat?.simonStats?.nombreDeCouleurs ?? 10;
  }

}
