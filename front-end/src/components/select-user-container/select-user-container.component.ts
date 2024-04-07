import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { Router } from "@angular/router";
import { UserService } from '../../services/user-service.service';
import IUser from '../../interfaces/IUser';
import { SelectUserItemComponent } from '../select-user-item/select-user-item.component';

@Component({
  standalone: true,
  selector: 'app-select-user-container',
  templateUrl: './select-user-container.component.html',
  styleUrls: ['./select-user-container.component.scss'],
  imports: [
    SelectUserItemComponent,
    NgForOf
  ]
})
export class SelectUserContainerComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  defineUser(userId: number) {
    this.userService.setUser(userId);
    this.router.navigate(['/selectQuiz']);
  }
}
