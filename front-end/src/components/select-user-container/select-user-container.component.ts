import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../services/user-service.service';
import IUser from '../../interfaces/IUser';
import { SelectUserItemComponent } from '../select-user-item/select-user-item.component';
import IAdmin from 'src/interfaces/IAdmin';
import { SearchQuizSelectorComponent } from "../search-quiz-selector/search-quiz-selector.component";

@Component({
  standalone: true,
  selector: 'app-select-user-container',
  templateUrl: './select-user-container.component.html',
  styleUrls: ['./select-user-container.component.scss'],
  imports: [
    SelectUserItemComponent,
    NgForOf,
    RouterLink,
    SearchQuizSelectorComponent
  ]
})
export class SelectUserContainerComponent implements OnInit {
  users: IUser[] = [];
  admin: IUser = {
    id: 0,
    name: "",
    firstname: "Admin",
    config: {} as any,
    avatar: "https://journalmetro.com/wp-content/uploads/2017/04/default_profile_400x400.png?fit=400%2C400",
    charts: [],
    statsId: 0
  };

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  defineUser(userId: number) {
    this.userService.setUser(userId);
    this.router.navigate(['/selectQuiz']);
  }

  searchUsers(searchTerm: string) {
    this.users = this.userService.searchUsers(searchTerm);
  }
}
