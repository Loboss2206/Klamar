import { Component, Input } from '@angular/core';
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";
import { GenericButtonComponent } from "../genericButton/genericButton.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { StatsService } from "../../services/stats.service";
import { UserService } from "../../services/user-service.service";
import IStats from "../../interfaces/IStats";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-quizResultBox',
  standalone: true,
  imports: [
    GenericButtonComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './quizResultBox.component.html',
  styleUrl: './quizResultBox.component.scss'
})
export class quizResultBoxComponent {

  user?: IUser | IAdmin
  id: number | undefined
  isThereQuestion: boolean = false
  @Input() date?: string
  @Input() sucessSimon?: number
  @Input() sucessMemory?: number
  @Input() sucessQuiz?: number
  @Input() statForButton?: IStats

  constructor(private _statsService: StatsService, private _userService: UserService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    console.log(this.statForButton?.questions)
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.user = this._userService.getTheUser(this.id)
    this.isThereQuestions()
  }

  defineStat(statId: number | undefined) {
    if (statId == undefined) {
      console.log("undefined stat id")
    }
    else {
      this._statsService.setStat(statId);
    }
  }

  isThereQuestions() {
    if (this.statForButton?.questions.length != 0) {
      this.isThereQuestion = true
    }
  }
}
