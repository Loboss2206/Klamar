import { Component, Input, SimpleChanges } from '@angular/core';
import { sortComponent } from '../sort/sort.component';
import { titlePageComponent } from '../titlePage/titlePage.component';
import { quizResultBoxComponent } from '../quizResultBox/quizResultBox.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ZoomSliderComponent } from '../zoomSlider/zoomSlider.component';
import {UserService} from "../../services/user-service.service";
import {ActivatedRoute} from "@angular/router";
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";


@Component({
  selector: 'app-quizResultPage',
  standalone: true,
  imports: [
    sortComponent,
    titlePageComponent,
    quizResultBoxComponent, NavbarComponent, ZoomSliderComponent
  ],
  templateUrl: './quizResultPage.component.html',
  styleUrl: './quizResultPage.component.scss'
})
export class quizResultPageComponent {
  id ?: number
  user ?: IUser | IAdmin
  constructor(private _userService : UserService, private route : ActivatedRoute) {
  }

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.user = this._userService.getTheUser(this.id)
  }
}
