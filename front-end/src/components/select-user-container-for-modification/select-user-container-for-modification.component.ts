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
  selector: 'app-select-user-container-for-modification',
  templateUrl: './select-user-container-for-modification.component.html',
  styleUrls: ['./select-user-container-for-modification.component.scss'],
  imports: [
    SelectUserItemComponent,
    NgForOf,
    RouterLink,
    SearchQuizSelectorComponent
  ]
})
export class SelectUserContainerForModificationComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  defineUserToModify(user: IUser) {
    sessionStorage.setItem("userToModify", JSON.stringify(user));
    this.router.navigate(['/createUser']);
  }

  searchUsers(searchTerm: string) {
    this.users = this.userService.searchUsers(searchTerm);
  }
}
