import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {SelectUserItemComponent} from "../select-user-item/select-user-item.component";
import IUser from "../../interfaces/IUser";
import {UserService} from "../../services/user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-user-stat',
  standalone: true,
    imports: [
        NgForOf,
        SelectUserItemComponent
    ],
  templateUrl: './select-user-stat.component.html',
  styleUrl: './select-user-stat.component.scss'
})
export class SelectUserStatComponent {
  users: IUser[] = [];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  defineUserToModify(user: IUser) {
    this.router.navigate(['/graphics/'+user.id]);
  }
}
