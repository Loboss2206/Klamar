import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { QuizService } from "../../services/quiz-service.service";
import * as Tone from "tone";
import IUser from "../../interfaces/IUser";
import { UserService } from "../../services/user-service.service";
import ISimonConfig from "../../interfaces/ISimonConfig";
import { GenericButtonComponent } from "../genericButton/genericButton.component";
import ISimonStat from "../../interfaces/ISimonStat";
import { StatsService } from "../../services/stats.service";
import { interval } from 'rxjs';

@Component({
  selector: 'simon-game',
  templateUrl: './simon-game.component.html',
  standalone: true,
  imports: [
    NgForOf,
    GenericButtonComponent,
    NgIf
  ],
  styleUrls: ['./simon-game.component.scss']
})
export class SimonGameComponent implements OnInit, OnDestroy {
  @ViewChild('simonButton') simonButton: ElementRef | undefined;
  @ViewChild('congratsButton') congratsButton: ElementRef | undefined;

  playerInput: number[] = [];
  gameInput: number[] = [];
  sequencePlaying: boolean = false;
  roundToWin: number = 5;
  numberOfBoxes: number = 10;
  numberOfRetries: number = 0;
  numberMaxOfRetries: number = 0;
  numberOfBoxesArray: number[] = Array.from({ length: this.numberOfBoxes }, (_, i) => i);
  buttonColors: string[] = [];
  rulesForSimon: ISimonConfig | undefined;
  lastButtonClickedTime: number = 0;
  inactivityInterval: number | null = 5000;
  intervalTime: number = 5000;
  user: IUser | null = this.userService.getCurrentUser();
  intervals: any[] = [];
  isGameStarted: boolean = false;
  isGameRunning: boolean = false;
  isGoodSequence: boolean = false;
  tipsMeter: number = 0;
  startTime: number = 0;
  shutup: boolean = false;
  message: string = '';
  buttonSkip: boolean = true;

  constructor(private renderer: Renderer2, private el: ElementRef, private route: ActivatedRoute, private quizService: QuizService, private userService: UserService, private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.buttonColors = this.generateDistinctColors(this.numberOfBoxes);
    this.rulesForSimon = this.quizService.getSimonRules();
    console.log(this.rulesForSimon);
    this.roundToWin = this.rulesForSimon?.numberOfRound || 5;
    this.numberOfBoxes = this.rulesForSimon?.numberOfBoxes || 4;
    this.numberMaxOfRetries = this.rulesForSimon?.numberOfRetriesAllowed || 0;
    this.intervalTime = this.user ? this.user.config.simonHints.displayTheFullSequenceAfter : 5000;
    this.numberOfBoxesArray = Array.from({ length: this.numberOfBoxes }, (_, i) => i);
    this.buttonSkip = this.userService.getUserConfig().displaySkip as any === "true" ? true : false;
    this.startTime = Date.now();
    this.shutup = false;
    this.onMessageReceived('wait', true);
  }

  async ngAfterViewInit() {
    await this.pause(200);
    this.toggleBigIt(true);
  }

  async onButtonClick(index: number) {
    if (this.sequencePlaying) {
      return;
    }
    this.stopInactivityInterval();
    const button = this.el.nativeElement.querySelector(`#button-${index}` as string);
    this.lastButtonClickedTime = Date.now();
    this.renderer.setStyle(button, 'box-shadow', `0 0 30px 15px ${this.buttonColors[index]}`);
    this.renderer.addClass(button, 'active');
    this.playSound(index);
    await this.pause(800);
    this.renderer.setStyle(button, 'box-shadow', 'none');
    this.renderer.removeClass(button, 'active');
    this.playerInput.push(index);
    this.checkPlayerInput();
    await this.pause(1000);
    this.startInactivityInterval();
  }

  playSound(index: number) {
    if (this.shutup) {
      return;
    }
    let minFrequency: number = 200;
    let maxFrequency: number = 800;
    const synth = new Tone.Synth().toDestination();
    const frequency = minFrequency + (maxFrequency - minFrequency) * (index / (this.numberOfBoxes - 1));
    const note = Tone.Frequency(frequency, "hz").toNote();
    synth.triggerAttackRelease(note, "8n");
    Tone.start();
  }

  async pause(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  startInactivityInterval() {
    const X_SECONDS = this.intervalTime + (800 * this.playerInput.length + 5000 * this.gameInput.length);
    console.log(X_SECONDS);
    this.inactivityInterval = setInterval(() => {
      if (Date.now() - this.lastButtonClickedTime > X_SECONDS) {
        this.tipsMeter++;
        this.playSequence();
      }
    }, X_SECONDS);
    this.intervals.push(this.inactivityInterval);
  }

  stopInactivityInterval() {
    if (this.inactivityInterval) {
      clearInterval(this.inactivityInterval);
      this.inactivityInterval = null;
    }
  }

  clearAllIntervals() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
  }


  startGame() {
    this.gameInput = [];
    this.playerInput = [];
    this.generateGameInput();
    this.playSequence();
    this.startInactivityInterval();
    this.isGameStarted = true;
  }

  generateGameInput() {
    if (this.gameInput.length === 0) {
      this.gameInput.push(Math.floor(Math.random() * this.numberOfBoxes));
      return;
    }
    const lastInput = this.gameInput[this.gameInput.length - 1];
    let newRandom;
    do {
      newRandom = Math.floor(Math.random() * this.numberOfBoxes);
    } while (newRandom === lastInput);
    this.gameInput.push(newRandom);
  }

  async onMessageReceived(message: 'yourTurn' | 'wait' | 'congrats' | 'playSequence', persistant: boolean = false) {
    if (message === 'yourTurn') {
      this.message = 'C\'est à vous de jouer !';
    }
    if (message === 'wait') {
      this.message = 'Appuyer pour commencer...';
    }
    if (message === 'congrats') {
      this.message = 'Bravo !';
    }
    if (message === 'playSequence') {
      this.message = 'Regardez la séquence...';
    }

    this.toggleBigIt(true);
    if (!persistant) {
      await this.pause(2000);
      this.toggleBigIt(false);
    }
  }

  async playSequence() {
    this.playerInput = [];
    this.isGameRunning = false;
    this.clearAllIntervals();
    this.sequencePlaying = true;
    this.onMessageReceived('playSequence');
    await this.pause(3000);
    for (let i = 0; i < this.gameInput.length; i++) {
      const button = this.el.nativeElement.querySelector(`#button-${this.gameInput[i]}`);
      this.renderer.setStyle(button, 'box-shadow', `0 0 30px 15px ${this.buttonColors[this.gameInput[i]]}`);
      this.renderer.addClass(button, 'active');
      this.playSound(this.gameInput[i]);
      await this.pause(800);
      this.renderer.setStyle(button, 'box-shadow', 'none');
      this.renderer.removeClass(button, 'active');
      if ((i + 1) >= this.gameInput.length) {
        this.sequencePlaying = false;
        this.startInactivityInterval();
        this.isGameRunning = true;
      }
    }

    await this.pause(1000);
    this.onMessageReceived('yourTurn');
    await this.pause(3000);
  }


  getButtonStyle(index: number) {
    const total = this.numberOfBoxes;
    const rotation = 360 / total * index;
    const translation = 30;
    return `rotate(${rotation}deg) translate(${translation}vh) rotate(-${rotation}deg)`;
  }

  async checkPlayerInput() {
    if (this.playerInput.length < this.gameInput.length) {
      if (this.playerInput[this.playerInput.length - 1] !== this.gameInput[this.playerInput.length - 1]) {
        this.numberOfRetries++;
        if (this.numberOfRetries >= this.numberMaxOfRetries) {
          this.stopInactivityInterval();
          this.saveSimonStats();
          this.quizService.endSimonGame();
        }
        this.playerInput = [];
        this.playSequence();
      }
    } else {
      for (let i = 0; i < this.playerInput.length; i++) {
        if (this.playerInput[i] !== this.gameInput[i]) {
          this.numberOfRetries++;
          if (this.numberOfRetries >= this.numberMaxOfRetries) {
            this.stopInactivityInterval();
            this.saveSimonStats();
            this.quizService.endSimonGame();
          }
          this.playerInput = [];
          this.playSequence();
          return;
        }
      }
      if (this.playerInput.length >= this.roundToWin) {
        this.stopInactivityInterval();
        this.saveSimonStats();
        this.quizService.endSimonGame();
        this.startGame();
      }
      this.numberOfRetries = 0;
      this.isGoodSequence = true;
      this.onMessageReceived('congrats');
      await this.pause(4000);
      this.isGoodSequence = false;
      this.playerInput = [];
      this.generateGameInput();
      this.playSequence();
    }
  }

  toggleBigIt(on: boolean) {
    if (on)
      this.renderer.addClass(this.congratsButton?.nativeElement, 'fullScreen');
    else
      this.renderer.removeClass(this.congratsButton?.nativeElement, 'fullScreen');
  }

  generateDistinctColors(n: number): string[] {
    const colors: string[] = [];
    const hueDifference = 1290 / n;
    for (let i = 0; i < n; i++) {
      const hue = (hueDifference * i) % 1290;
      const color = `hsl(${hue}, 80%, 50%)`;
      colors.push(color);
    }
    return colors;
  }

  getButtonColor(i: number) {
    if (this.user && this.user.config.simon.isColorful) {
      return this.buttonColors[i];
    } else {
      return 'gray';
    }
  }

  ngOnDestroy() {
    this.stopInactivityInterval();
    this.clearAllIntervals();
    this.shutup = true;
  }

  takeAction() {
    if (!this.isGameStarted) {
      this.startGame();
    } else if (this.isGameRunning) {
      this.stopInactivityInterval();
      this.playSequence();
    }
  }

  saveSimonStats() {
    const simonStat: ISimonStat = {
      id: 1,
      erreurSimon: this.numberOfRetries,
      indicesSimon: this.tipsMeter,
      tempsSimon: this.getTimeSpentOnMemory(),
      tailleFinalSimon: this.roundToWin,
      nombreDeCouleurs: this.numberOfBoxes,
      wasPassed: false
    };
    this.statsService.addSimonStat(simonStat);
  }

  skipSimon() {
    const simonStat: ISimonStat = {
      id: 1,
      erreurSimon: this.numberOfRetries,
      indicesSimon: this.tipsMeter,
      tempsSimon: this.getTimeSpentOnMemory(),
      tailleFinalSimon: this.roundToWin,
      nombreDeCouleurs: this.numberOfBoxes,
      wasPassed: true
    };
    this.statsService.addSimonStat(simonStat);
    this.quizService.endSimonGame();
  }

  private getTimeSpentOnMemory(): number {
    const currentTime = Date.now();
    return Number(((currentTime - this.startTime) / 1000).toFixed(1));
  }
}
