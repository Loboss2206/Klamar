import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import IStats from "../interfaces/IStats";
import {stats} from "../mocks/stats";
import IUser from "../interfaces/IUser";
import IAdmin from "../interfaces/IAdmin";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private currentStatId: number | undefined;
  getStat(id: number | undefined) : Observable<IStats | undefined>{
    return of(stats.find(stats => stats.id === id))
  }
  getTheStat(): number | undefined {
    return this.currentStatId;
  }

  setStat(statId: number | undefined): void {
    this.currentStatId = statId;
  }
}
