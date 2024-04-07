import { Injectable } from '@angular/core';
import { users } from "../mocks/users";
import IUser from 'src/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: IUser[] = users;
  private currentUser: number = -1;

  getUsers(): IUser[] {
    return this.users;
  }

  getTheUser(id: number) {
    let user: IUser | undefined = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  setUser(id: number) {
    this.currentUser = id;
  }
}
