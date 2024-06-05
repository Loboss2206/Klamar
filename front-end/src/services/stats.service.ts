import { Injectable } from '@angular/core';
import { catchError, max, Observable } from "rxjs";
import IStats from "../interfaces/IStats";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { serverUrl } from "../configs/server.config";
import IQuestionStat from "../interfaces/IQuestionStat";
import IMemoryStat from "../interfaces/IMemoryStat";
import ISimonStat from "../interfaces/ISimonStat";
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiURL = serverUrl + '/stats/'

  private currentInGameStat?: IStats

  private dates: string[] = [];
  private sucessMemory: number[] = [];
  private sucessQuestion: number[] = [];
  private sucessSimon: number[] = [];
  private datesMemory: string[] = [];
  private datesSimon: string[] = [];
  constructor(private http: HttpClient, private userService: UserService) {
  }
  private currentStatId: number | undefined;
  getStat(id: number | undefined): Observable<IStats | undefined> {
    return this.http.get<IStats>(this.apiURL + `/${id}`)
  }

  getTheStat(): number | undefined {
    return this.currentStatId;
  }

  getStats(): Observable<IStats[]> {
    return this.http.get<IStats[]>(this.apiURL)
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
      userId: this.userService.getCurrentId(),
      questions: [],
      memoryStats: undefined,
      simonStats: undefined,
      sucessSimon: 0,
      sucessMemory: 0,
      sucessQuiz: 0,
      date: new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/([\d]{2})-([\d]{2})-([\d]{4}) ([\d]{2}:[\d]{2})/g, '$1/$2/$3 $4')
    };
    this.currentInGameStat = newStat;
  }

  addQuestionStat(questionStat: IQuestionStat): void {
    console.log(this.currentInGameStat)
    if (this.currentInGameStat) {
      this.currentInGameStat.questions.push(questionStat);
    } else {
      console.error('Current stats not initialized.');
    }
  }

  addMemoryStat(memoryStat: IMemoryStat): void {
    console.log(this.currentInGameStat)
    if (this.currentInGameStat) {
      this.currentInGameStat.memoryStats = memoryStat;
    } else {
      console.error('Current stats not initialized.');
    }
  }

  addSimonStat(simonStat: ISimonStat): void {
    console.log(this.currentInGameStat)
    if (this.currentInGameStat) {
      this.currentInGameStat.simonStats = simonStat;
    } else {
      console.error('Current stats not initialized.');
    }
  }

  addSummaryStats() {
    if (this.currentInGameStat) {
      let questionsWithoutNegativeScore = this.currentInGameStat.questions.filter(question => question.pointQuestion >= 0);
      let sucessQuiz = Math.ceil(
        questionsWithoutNegativeScore
          .reduce((acc, question) => acc + question.pointQuestion, 0) /
        questionsWithoutNegativeScore
          .reduce((acc, question) => acc + question.maxPointQuestion, 0) *
        100
      );
      if (!Number.isNaN(sucessQuiz)) this.currentInGameStat.sucessQuiz = sucessQuiz !== undefined ? sucessQuiz : 0;

      console.log("test" + typeof (sucessQuiz));

      if (this.currentInGameStat.memoryStats) {
        if (this.currentInGameStat.memoryStats.wasPassed) this.currentInGameStat.sucessMemory = 0;
        else this.currentInGameStat.sucessMemory = Math.max(100 - Math.max(this.currentInGameStat.memoryStats.erreurMemory - 3, 0) * 10, 0);
      }
      if (this.currentInGameStat.simonStats) {
        if (this.currentInGameStat.simonStats.wasPassed) this.currentInGameStat.sucessSimon = 0;
        else this.currentInGameStat.sucessSimon = Math.max(this.currentInGameStat.simonStats ? 100 - this.currentInGameStat.simonStats.erreurSimon * 10 : 0, 0);
      }
    } else {
      console.error('Current stats not initialized.');
    }
  }

  dumpStat() {
    this.dates = []
    this.datesMemory = []
    this.datesSimon = []
    this.sucessSimon = []
    this.sucessQuestion = []
    this.sucessMemory = []
  }

  getGraphicStat(idUser: number) {
    this.getStats().subscribe(stats => {
      const filteredStats = stats.filter(stat => stat.userId === idUser);

      for (const stat of filteredStats) {
        this.dates.push(stat.date);
        this.sucessQuestion.push(Number(stat.sucessQuiz));
        if (stat.sucessMemory != undefined) {
          this.sucessMemory.push(Number(stat.sucessMemory))
          this.datesMemory.push(String(stat.date))
        }
        if (stat.sucessSimon != undefined) {
          this.sucessSimon.push(Number(stat.sucessSimon))
          this.datesSimon.push(String(stat.date))
        }
      }
    });
    return [this.dates, this.sucessQuestion, this.datesMemory, this.sucessMemory, this.datesSimon, this.sucessSimon]
  }

  sendStat(): void {
    this.addSummaryStats();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("ça post");
    console.log(this.currentInGameStat);
    console.log(this.apiURL);

    console.log(this.currentInGameStat);
    this.http.post<IStats>(this.apiURL, this.currentInGameStat, { headers }).pipe(
      catchError((error) => {
        console.error('Error sending stat:', error);
        throw error;
      })
    ).subscribe();
  }

  sendSpecificStat(stat: IStats): void {
    this.addSummaryStats();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("ça post");
    console.log(stat);
    console.log(this.apiURL);
    this.http.post<IStats>(this.apiURL, stat, { headers }).pipe(
      catchError((error) => {
        console.error('Error sending stat:', error);
        throw error;
      })
    ).subscribe();
  }
}
