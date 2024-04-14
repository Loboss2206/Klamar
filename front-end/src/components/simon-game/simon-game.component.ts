import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../services/quiz-service.service";
import * as Tone from "tone";
import IUser from "../../interfaces/IUser";
import {UserService} from "../../services/user-service.service";
import ISimonConfig from "../../interfaces/ISimonConfig";
import {GenericButtonComponent} from "../genericButton/genericButton.component";

@Component({
  selector: 'simon-game',
  templateUrl: './simon-game.component.html',
  standalone: true,
  imports: [
    NgForOf,
    GenericButtonComponent,
    NgIf
  ],
  styleUrls: ['./simon-game.component.css']
})
export class SimonGameComponent implements OnInit {
  @ViewChild('simonButton') simonButton: ElementRef | undefined;

  playerInput: number[] = [];
  gameInput: number[] = [];
  sequencePlaying: boolean = false;
  roundToWin: number = 5;
  numberOfBoxes: number = 4;
  numberOfRetries: number = 0;
  numberMaxOfRetries: number = 0;
  numberOfBoxesArray: number[] = Array.from({length: this.numberOfBoxes}, (_, i) => i);
  buttonColors: string[] = [];
  rulesForSimon: ISimonConfig | undefined;
  lastButtonClickedTime: number = 0;
  inactivityInterval: number | null = 5000;
  intervalTime: number = 5000;
  user: IUser | null = this.userService.getCurrentUser();
  intervals: any[] = [];
  isGameStarted: boolean = false;
  isGameRunning: boolean = false;
  isGoodSequence: boolean = false

  constructor(private renderer: Renderer2, private el: ElementRef, private route: ActivatedRoute, private quizService: QuizService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.buttonColors = this.generateDistinctColors(this.numberOfBoxes);
    this.rulesForSimon = this.quizService.getSimonRules();
    console.log(this.rulesForSimon);
    this.roundToWin = this.rulesForSimon?.numberOfRound || 5;
    this.numberOfBoxes = this.rulesForSimon?.numberOfBoxes || 4;
    this.numberMaxOfRetries = this.rulesForSimon?.numberOfRetriesAllowed || 0;
    this.intervalTime = this.user ? this.user.config.simonHints.displayTheFullSequenceAfter : 5000;
    this.numberOfBoxesArray = Array.from({length: this.numberOfBoxes}, (_, i) => i);
  }

  onButtonClick(index: number) {
    if (this.sequencePlaying) {
      return;
    }
    this.lastButtonClickedTime = Date.now();
    this.playSound(index);
    this.playerInput.push(index);
    this.checkPlayerInput();
  }

  playSound(index: number) {
    let minFrequency: number = 200;
    let maxFrequency: number = 800;
    const synth = new Tone.Synth().toDestination();
    const frequency = minFrequency + (maxFrequency - minFrequency) * (index / (this.numberOfBoxes - 1));
    const note = Tone.Frequency(frequency, "hz").toNote();
    synth.triggerAttackRelease(note, "8n");
    Tone.start();
  }

  startInactivityInterval() {
    const X_SECONDS = this.intervalTime + (800 * this.playerInput.length + 1000 * this.gameInput.length);
    console.log(X_SECONDS);
    this.inactivityInterval = setInterval(() => {
      if (Date.now() - this.lastButtonClickedTime > X_SECONDS) {
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
    this.gameInput.push(Math.floor(Math.random() * this.numberOfBoxes));
  }

  playSequence() {
    this.playerInput = [];
    this.isGameRunning = false;
    this.clearAllIntervals();
    this.sequencePlaying = true;
    let i = 0;
    const interval = setInterval(() => {
      const button = this.el.nativeElement.querySelector(`#button-${this.gameInput[i]}`);
      this.renderer.setStyle(button, 'box-shadow', `0 0 30px 15px ${this.buttonColors[this.gameInput[i]]}`);
      this.renderer.addClass(button, 'active');
      this.playSound(this.gameInput[i])
      setTimeout(() => {
        this.renderer.setStyle(button, 'box-shadow', 'none');
        this.renderer.removeClass(button, 'active');
      }, 800);
      i++;
      if (i >= this.gameInput.length) {
        clearInterval(interval);
        this.sequencePlaying = false;
        this.startInactivityInterval();
        this.isGameRunning = true;
      }
    }, 1000);
    this.intervals.push(interval);
  }


  getButtonStyle(index: number) {
    const total = this.numberOfBoxes;
    const rotation = 360 / total * index;
    const translation = 30;
    return `rotate(${rotation}deg) translate(${translation}vh) rotate(-${rotation}deg)`;
  }

  checkPlayerInput() {
    if (this.playerInput.length < this.gameInput.length) {
      if (this.playerInput[this.playerInput.length - 1] !== this.gameInput[this.playerInput.length - 1]) {
        this.numberOfRetries++;
        if (this.numberOfRetries >= this.numberMaxOfRetries) {
          this.stopInactivityInterval();
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
            this.quizService.endSimonGame();
          }
          this.playerInput = [];
          this.playSequence();
          return;
        }
      }
      if (this.playerInput.length >= this.roundToWin) {
        this.stopInactivityInterval();
        this.quizService.endSimonGame();
        this.startGame();
      }
      this.isGoodSequence = true;
      setTimeout(() => {
        this.isGoodSequence = false;
      }, 1000);
      this.playerInput = [];
      this.generateGameInput();
      this.playSequence();
    }
  }

  generateDistinctColors(n: number): string[] {
    const colors: string[] = [];
    const hueDifference = 360 / n;
    for (let i = 0; i < n; i++) {
      const hue = (hueDifference * i) % 360;
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
  }

  takeAction() {
    if (!this.isGameStarted) {
      this.startGame();
    } else if (this.isGameRunning) {
      this.stopInactivityInterval();
      this.playSequence();
    }
  }
}
