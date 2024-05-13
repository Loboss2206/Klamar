import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../services/user-service.service';
import IUser from '../../interfaces/IUser';
import { SelectUserItemComponent } from '../select-user-item/select-user-item.component';
import IAdmin from 'src/interfaces/IAdmin';
import { SearchQuizSelectorComponent } from "../search-quiz-selector/search-quiz-selector.component";
import { GenericButtonComponent } from '../genericButton/genericButton.component';

@Component({
  standalone: true,
  selector: 'app-select-user-container-for-modification',
  templateUrl: './select-user-container-for-modification.component.html',
  styleUrls: ['./select-user-container-for-modification.component.scss'],
  imports: [
    SelectUserItemComponent,
    NgForOf,
    RouterLink,
    SearchQuizSelectorComponent,
    GenericButtonComponent
  ]
})
export class SelectUserContainerForModificationComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.users$.subscribe((users: IUser[]) => {
      this.users = users;
    });
  }

  defineUserToModify(user: IUser) {
    this.router.navigate(['/admin/modifyUser/' + user.id]);
  }

  setModifyUser(user: IUser, event: Event) {
    // get user item that has been clicked
    const targetElement = event.currentTarget as HTMLElement;

    // check if there is an existing di
    const existingDiv = document.querySelector('.customDiv');

    if (existingDiv && targetElement.parentElement != existingDiv.parentElement) {
      existingDiv.remove();
      this.createCustomDiv(user, targetElement);

    } else if (existingDiv) {
      existingDiv.remove();
    } else {
      this.createCustomDiv(user, targetElement);
    }
  }

  private createCustomDiv(user: IUser, targetElement: HTMLElement) {
    // create a new div
    const div = document.createElement('div');
    div.classList.add('customDiv');

    const editButton = document.createElement('button');
    editButton.textContent = 'Modifier';
    editButton.style.fontSize = '1.2em'
    editButton.style.color = 'white';
    editButton.style.backgroundColor = 'blue';
    editButton.style.border = 'blue';
    editButton.style.borderRadius = '10px';
    editButton.style.padding = '10px';
    editButton.style.margin = '20px';
    editButton.addEventListener('click', () => this.defineUserToModify(user));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.style.fontSize = '1.2em'
    deleteButton.style.color = 'white';
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.border = 'red';
    deleteButton.style.borderRadius = '10px';
    deleteButton.style.padding = '10px';
    deleteButton.style.margin = '20px';
    deleteButton.style.boxShadow;
    deleteButton.addEventListener('click', () => this.deleteUser(user));

    div.appendChild(editButton);
    div.appendChild(deleteButton);

    // Insert above the user item
    targetElement.insertAdjacentElement('beforebegin', div);
  }







  deleteUser(user: IUser) {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (isConfirmed) {
      this.userService.deleteUser(user);
    }
  }

  searchUsers(searchTerm: string) {
    this.users = this.userService.searchUsers(searchTerm);
  }
}
