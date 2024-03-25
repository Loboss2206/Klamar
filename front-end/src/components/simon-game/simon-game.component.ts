import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'simon-game',
  templateUrl: './simon-game.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./simon-game.component.css']
})
export class SimonGameComponent implements OnInit {

  playerInput: number[] = [];
  gameInput: number[] = [];
  sequencePlaying: boolean = false;
  roundToWin: number = 5;

  constructor(private renderer: Renderer2, private el: ElementRef, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const numberOfRound = params['numberOfRound'];
      if (!isNaN(numberOfRound)) {
        this.roundToWin = numberOfRound;
      }
    });
    this.startGame();
  }

  onButtonClick(index: number) {
    if (this.sequencePlaying) {
      return;
    }
    this.playSound(index);
    this.playerInput.push(index);
    if (this.playerInput.length === this.gameInput.length) {
      this.checkPlayerInput();
    }
  }
  playSound(index: number) {
    const audio = new Audio();
    audio.src = `assets/sounds/simonSound.mp3`;
    // Bon j'ai tenté de faire un truc mais ça marche pas, je laisse ça là au cas où....
    const baseFrequency = 440;
    const indexDifference = index - 3;
    const frequencyMultiplier = Math.pow(2, indexDifference / 12);

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audio);
    const pitchControl = audioContext.createGain();

    pitchControl.gain.value = frequencyMultiplier;

    source.connect(pitchControl).connect(audioContext.destination);
    audio.load();
    audio.play();
  }


  startGame() {
    this.gameInput = [];
    this.playerInput = [];
    this.generateGameInput();
    this.playSequence();
  }

  generateGameInput() {
    this.gameInput.push(Math.floor(Math.random() * 9));
  }

  playSequence() {
    this.sequencePlaying = true;
    let i = 0;
    const interval = setInterval(() => {
      const button = this.el.nativeElement.querySelector(`#button-${this.gameInput[i]}`);
      this.renderer.addClass(button, 'simon-button-active');
      this.playSound(this.gameInput[i])
      setTimeout(() => {
        this.renderer.removeClass(button, 'simon-button-active');
      }, 500);
      i++;
      if (i >= this.gameInput.length) {
        clearInterval(interval);
        this.sequencePlaying = false;
      }
    }, 1000);
  }

  checkPlayerInput() {
    for (let i = 0; i < this.playerInput.length; i++) {
      if (this.playerInput[i] !== this.gameInput[i]) {
        //TODO : handle losing
        alert('You lost!');
        this.startGame();
        return;
      }
    }
    if (this.playerInput.length >= this.roundToWin) {
      //TODO : handle winning
      alert('You won!');
      this.startGame();
    }
    this.playerInput = [];
    this.generateGameInput();
    this.playSequence();
  }
}
