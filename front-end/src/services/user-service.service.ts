import { Injectable } from '@angular/core';
import IUser from 'src/interfaces/IUser';
import IAdmin from "../interfaces/IAdmin";
import { adminList } from "../mocks/admin";
import { BehaviorSubject, Subject, of } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {
    console.log('UserService created');
    this.retrieveUsers();
  }

  private users: IUser[] = [];
  public users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public userSelected$: Subject<IUser> = new Subject();

  private currentUser: number = parseInt(sessionStorage.getItem('currentUser') || '-1', 10);
  private admins: IAdmin[] = adminList;
  private currentUserSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({} as IUser);
  public readonly listOfColorsBlind = ["protanopia", "deuteranopia", "tritanopia", "protanomaly", "deuteranomaly", "tritanomaly", "achromatopsia", "achromatomaly"];
  private connectedAdminTokens: { [token: string]: number }[] = [];
  private userUrl = serverUrl + '/users';
  private httpOptions = httpOptionsBase;

  getUsers(): IUser[] {
    console.log(this.users);
    return this.users;
  }

  getCurrentId(): number {
    return this.currentUser;
  }

  getCurrentUser(): IUser | null {
    if (this.currentUser === -1) {
      return null;
    }
    return this.getTheUser(this.currentUser) as IUser;
  }

  getCurrentAdmin(): IAdmin | null {
    let token = JSON.parse(sessionStorage.getItem('currentUser') as string);
    console.log(this.connectedAdminTokens);
    let parsedToken = this.connectedAdminTokens.find((tokenElement) => tokenElement[token]);
    let adminIDFromToken = parsedToken ? parsedToken[token] : null;
    if (adminIDFromToken) {
      if (this.currentUser === -1 && !token) {
        return null;
      }
      return this.admins.find((admin) => admin.id === adminIDFromToken) as IAdmin;
    }
    return null;
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
    let user = this.users.find(user => user.id === id);
    return of(user?.charts);
  }

  getStats(id: number) {
    let user = this.users.find(user => user.id === id);
    return of(user?.statsId);
  }


  connectAsAdmin(username: string, password: string) {
    let admin = this.admins.find((adminElement: {
      username: any;
      mdp: any;
    }) => adminElement.username === username && adminElement.mdp === password);
    if (admin) {
      this.setUserAsAdmin(admin.id).then(() => {
        this.router.navigate(['/admin/gestion']);
      });
    } else {
      alert('Mauvais identifiants');
    }
  }

  async tokenGenerator() {
    const token = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + new Date().getTime();
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async setUserAsAdmin(id: number) {
    this.currentUser = id;
    let token = await this.tokenGenerator()
    this.connectedAdminTokens.push({ [token]: id });
    sessionStorage.setItem('currentUser', JSON.stringify(token));
  }

  getUserConfig() {
    let user = this.getTheUser(this.currentUser) as IUser;
    return user.config;
  }

  setUser(id: number) {
    this.currentUser = id;
    sessionStorage.setItem('currentUser', JSON.stringify(id));
    this.currentUserSubject.next(this.getTheUser(id) as IUser);
  }

  searchUsers(searchTerm: string) {
    return this.users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.firstname.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getUserColorBlind(id: number) {
    let user = this.getTheUser(id) as IUser;
    console.log(user.colorBlind);
    return user.colorBlind;
  }

  addUser(user: IUser): void {
    this.http.post<IUser>(this.userUrl, user, this.httpOptions).subscribe(() => this.retrieveUsers());
  }

  retrieveUsers(): void {
    this.http.get<IUser[]>(this.userUrl).subscribe((userList: IUser[]) => {
      this.users = userList;
      this.users$.next(this.users);
    });
  }

  deleteUser(user: IUser): void {
    const urlWithId = this.userUrl + '/' + user.id;
    this.http.delete<IUser>(urlWithId, this.httpOptions).subscribe(() => this.retrieveUsers());
  }

  verifyTokenValidity(token: string, admin: boolean) {
    if (admin) {
      let tokenFound;
      this.connectedAdminTokens.forEach((tokenElement, index: number) => {
        let key = Object.keys(tokenElement)[0];
        if (key === token) {
          tokenFound = tokenElement;
        }
      });
      return !!tokenFound;
    }
    return false;
  }

  modifyUser(user: IUser): void {
    const urlWithId = this.userUrl + '/' + user.id;
    this.http.put<IUser>(urlWithId, user, this.httpOptions).subscribe(() => this.retrieveUsers());
  }
}
