import {Component, OnDestroy, OnInit} from '@angular/core';
import {titlePageComponent} from "../titlePage/titlePage.component";
import {sortComponent} from "../sort/sort.component";
import {ZoomSliderComponent} from "../zoomSlider/zoomSlider.component";
import {GraphicComponent} from "../graphic/graphic.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../../services/user-service.service";
import {NgForOf, NgIf} from "@angular/common";
import IGraphic from "../../interfaces/IGraphic";
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";
import {GenericButtonComponent} from "../genericButton/genericButton.component";
import {Subscription} from "rxjs";
import {StatsService} from "../../services/stats.service";


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
    NgIf,

  ],
  templateUrl: './graphic-page.component.html',
  styleUrl: './graphic-page.component.scss'
})
export class GraphicPageComponent implements OnInit, OnDestroy {
  id: number | undefined
  chartIDs: string[] | undefined
  charts: IGraphic[] = []
  user ?: IUser | IAdmin
  statGraphic ?: (string[] | number[])[] = []
  private subscriptions: Subscription[] = [];
  date: string[] = []
  sucessQuestion: number[] = []
  dateMemory: string[] = []
  sucessMemory: number[] = []
  dateSimon: string[] = []
  sucessSimon: number[] = []

  constructor(private _userService: UserService, private route: ActivatedRoute, private _statsService: StatsService) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.user = this._userService.getTheUser(this.id)
    this.statGraphic = this._statsService.getGraphicStat(this.user.id)
    console.log(this.statGraphic)
    this.date = this.statGraphic[0] as string[]
    this.sucessQuestion = this.statGraphic[1] as number[]
    this.dateMemory = this.statGraphic[2] as string[]
    this.sucessMemory = this.statGraphic[3] as number[]
    this.dateSimon = this.statGraphic[4] as string[]
    this.sucessSimon = this.statGraphic[5] as number[]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.chartIDs = undefined
    this.charts = []
    this._statsService.dumpStat()
    console.log(this.date)
    console.log("cc")
    console.log(this.statGraphic)
  }
}
