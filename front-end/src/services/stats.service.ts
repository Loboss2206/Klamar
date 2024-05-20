import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import IStats from "../interfaces/IStats";
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../configs/server.config";
import IQuestionStat from "../interfaces/IQuestionStat";
import IMemoryStat from "../interfaces/IMemoryStat";
import ISimonStat from "../interfaces/ISimonStat";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiURL = serverUrl + '/stats'

  private currentInGameStat ?: IStats
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

  private generateRandomId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  createStat(): void {
    const newStat: IStats = {
      id: this.generateRandomId(),
      questions: [],
      memoryStats: undefined,
      simonStats: undefined,
      sucessSimon: 0,
      sucessMemory: 0,
      sucessQuiz: 0,
      date: new Date().toISOString()
    };
    console.log("id"+newStat.id);
    this.currentInGameStat = newStat;
    console.log("id2"+this.currentInGameStat.id)
    console.log("currentGamestat"+ this.currentInGameStat);
  }

  addQuestionStat(questionStat: IQuestionStat): void {
    console.log(this.currentInGameStat)
    if (this.currentInGameStat) {
      this.currentInGameStat.questions.push(questionStat);
    } else {
      console.error('Current stats not initialized.');
    }
  }

  addMemoryStat(memoryStat : IMemoryStat): void {
    console.log(this.currentInGameStat)
    if (this.currentInGameStat) {
      this.currentInGameStat.memoryStats = memoryStat;
    } else {
      console.error('Current stats not initialized.');
    }
  }

    addSimonStat(simonStat : ISimonStat): void {
        console.log(this.currentInGameStat)
        if (this.currentInGameStat) {
            this.currentInGameStat.simonStats = simonStat;
        } else {
            console.error('Current stats not initialized.');
        }
    }
  sendStat(): Observable<IStats>{
    console.log("ça post");
    console.log(this.currentInGameStat);
    return this.http.post<IStats>(this.apiURL, this.currentInGameStat).pipe(
      catchError((error) => {
        console.error('Error sending stat:', error);
        throw error;
      })
    );
  }
}
