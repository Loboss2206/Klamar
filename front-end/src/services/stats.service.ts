import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import IStats from "../interfaces/IStats";
import {stats} from "../mocks/stats";
import IUser from "../interfaces/IUser";
import IAdmin from "../interfaces/IAdmin";
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../configs/server.config";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiURL = serverUrl + '/stats'
  constructor(private http : HttpClient) {
  }
  private currentStatId: number | undefined;
  getStat(id: number | undefined) : Observable<IStats | undefined>{
    return this.http.get<IStats>(this.apiURL + `/${id}`)
  }
  getTheStat(): number | undefined {
    return this.currentStatId;
  }

  setStat(statId: number | undefined): void {
    this.currentStatId = statId;
  }
}
