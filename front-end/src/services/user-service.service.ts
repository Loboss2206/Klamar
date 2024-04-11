import { Injectable } from '@angular/core';
import { users } from "../mocks/users";
import IUser from 'src/interfaces/IUser';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: IUser[] = users;
  private currentUser: number = -1;

  getUsers(): IUser[] {
    return this.users;
  }

  getCurrentUser(): IUser | null {
    if (this.currentUser === -1) {
      return null;
    }
    return this.getTheUser(this.currentUser);
  }

  getTheUser(id: number) {
    let user: IUser | undefined = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  getCharts(id: number) {
    let user = users.find(user => user.id === id);
    return of(user?.charts);
  }


  setUser(id: number) {
    this.currentUser = id;
  }
}
