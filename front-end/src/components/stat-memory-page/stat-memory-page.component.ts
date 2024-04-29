import {Component, OnInit} from '@angular/core';
import {titlePageComponent} from "../titlePage/titlePage.component";
import {StatQuestionComponent} from "../stat-question/stat-question.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";
import IStats from "../../interfaces/IStats";
import {StatsService} from "../../services/stats.service";
import {UserService} from "../../services/user-service.service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";
import {ResultSimonComponent} from "../result-simon/result-simon.component";
import {ResultMemoryComponent} from "../result-memory/result-memory.component";

@Component({
  selector: 'app-stat-memory-page',
  standalone: true,
  imports: [
    titlePageComponent,
    StatQuestionComponent,
    ZoomSliderComponent,
    NgForOf,
    ResultSimonComponent,
    ResultMemoryComponent
  ],
  templateUrl: './stat-memory-page.component.html',
  styleUrl: './stat-memory-page.component.scss'
})
export class StatMemoryPageComponent implements OnInit{
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
