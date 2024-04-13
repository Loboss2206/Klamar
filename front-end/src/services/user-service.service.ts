import { Injectable } from '@angular/core';
import { users } from "../mocks/users";
import IUser from 'src/interfaces/IUser';
import IAdmin from "../interfaces/IAdmin";
import { adminList } from "../mocks/admin";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: IUser[] = users;
  private currentUser: number = parseInt(sessionStorage.getItem('currentUser') || '-1', 10);
  private admins: IAdmin[] = adminList;

  getUsers(): IUser[] {
    return this.users;
  }

  getCurrentUser(): IUser | null {
    if (this.currentUser === -1) {
      return null;
    }
    return this.getTheUser(this.currentUser) as IUser;
  }

  getCurrentAdmin(): IAdmin | null {
    if (this.currentUser === -1) {
      return null;
    }
    return this.getTheUser(this.currentUser) as IAdmin;
  }

  getTheUser(id: number) {
    let user: IUser | undefined = this.users.find((user) => user.id === id);
    if (!user) {
      let admin: IAdmin | undefined = this.admins.find((admin) => admin.id === id);
      if (!admin) {
        throw new Error('User not found');
      }
      return admin;
    }
    return user;
  }

  getCharts(id: number) {
    let user = users.find(user => user.id === id);
    return of(user?.charts);
  }


  connectAsAdmin(username: string, password: string) {
    let admin = this.admins.find((adminElement: { username: any; mdp: any; }) => adminElement.username === username && adminElement.mdp === password);
    if (admin) {
      this.setUser(admin.id);
      return true;
    } else {
      return false;
    }
  }

  getUserConfig() {
    let user = this.getTheUser(this.currentUser) as IUser;
    return user.config;
  }

  setUser(id: number) {
    this.currentUser = id;
    sessionStorage.setItem('currentUser', JSON.stringify(id));
  }

  searchUsers(searchTerm: string) {
    return this.users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.firstname.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
