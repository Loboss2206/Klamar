import { Component } from '@angular/core';
import { GenericButtonComponent } from "../genericButton/genericButton.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";
import { StatsService } from "../../services/stats.service";
import { UserService } from "../../services/user-service.service";
import { GraphicPageComponent } from "../graphic-page/graphic-page.component";
import { quizResultPageComponent } from '../quizResultPage/quizResultPage.component';


@Component({
  selector: 'app-select-stat',
  standalone: true,
  imports: [
    GenericButtonComponent,
    RouterLink,
    GraphicPageComponent,
    quizResultPageComponent
  ],
  templateUrl: './select-stat.component.html',
  styleUrl: './select-stat.component.scss'
})
export class SelectStatComponent {
  id?: number
  user?: IUser | IAdmin
  constructor(private _userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.user = this._userService.getTheUser(this.id)
    });
  }
}
