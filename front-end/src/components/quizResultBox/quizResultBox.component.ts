import { Component, Input, SimpleChanges } from '@angular/core';
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";
import {GenericButtonComponent} from "../genericButton/genericButton.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {StatsService} from "../../services/stats.service";
import {UserService} from "../../services/user-service.service";

@Component({
  selector: 'app-quizResultBox',
  standalone: true,
  imports: [
    GenericButtonComponent,
    RouterLink
  ],
  templateUrl: './quizResultBox.component.html',
  styleUrl: './quizResultBox.component.scss'
})
export class quizResultBoxComponent {

  user ?: IUser | IAdmin
  id: number | undefined
  @Input() date ?: string
  @Input() sucessSimon ?: number
  @Input() sucessMemory ?: number
  @Input() sucessQuiz ?: number

  constructor(private _statsService : StatsService , private _userService : UserService , private route : ActivatedRoute) {
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.user = this._userService.getTheUser(this.id)
  }
}
