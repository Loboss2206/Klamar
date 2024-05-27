import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { sortComponent } from '../sort/sort.component';
import { titlePageComponent } from '../titlePage/titlePage.component';
import { quizResultBoxComponent } from '../quizResultBox/quizResultBox.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ZoomSliderComponent } from '../zoomSlider/zoomSlider.component';
import { UserService } from "../../services/user-service.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";
import IStats from "../../interfaces/IStats";
import { StatsService } from "../../services/stats.service";
import { NgForOf } from "@angular/common";
import { GenericButtonComponent } from "../genericButton/genericButton.component";


@Component({
  selector: 'app-quizResultPage',
  standalone: true,
  imports: [
    sortComponent,
    titlePageComponent,
    quizResultBoxComponent, NavbarComponent, ZoomSliderComponent, NgForOf, GenericButtonComponent, RouterLink
  ],
  templateUrl: './quizResultPage.component.html',
  styleUrl: './quizResultPage.component.scss'
})
export class quizResultPageComponent implements OnInit {
  id: number | undefined
  user?: IUser | IAdmin
  statsId?: number[]
  stats: IStats[] = []
  constructor(private _statsService: StatsService, private _userService: UserService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    /*
    this.user = this._userService.getTheUser(this.id)
    console.log(this.user.firstname)
    this._userService.getStats(this.id).subscribe(stats => {
      this.statsId = stats
      console.log(stats)
    })
    if (this.statsId) {
      for (let statId of this.statsId) {
        this._statsService.getStat(statId).subscribe(stat => {
          console.log(stat)
          if (stat) {
            this.stats.push(stat)
          }
        })
      }
    }
*/
    this._statsService.getStats().subscribe(stats => {
      if (stats) {
        console.log(stats)
        for (let stat of stats) {
          console.log(stat)
          console.log("userId : " + stat.userId)
          console.log("thisId : " + this.id);
          if (stat.userId === this.id) {
            this.stats.push(stat)
          }
        }
      }
    })
  }
}
