import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import IStats from "../interfaces/IStats";
import {stats} from "../mocks/stats";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  getStat(id : number) : Observable<IStats | undefined>{
    return of(stats.find(stats => stats.id === id))
  }
}
