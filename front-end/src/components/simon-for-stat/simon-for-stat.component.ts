import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
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
  selector: 'simon-for-stat',
  templateUrl: './simon-for-stat.component.html',
  standalone: true,
  imports: [
    NgForOf,
    GenericButtonComponent,
    NgIf
  ],
  styleUrls: ['./simon-for-stat.component.scss']
})
export class SimonForStatComponent implements OnInit ,AfterViewChecked{
  @Input() numberOfBoxes: number = 1;
  numberOfBoxesArray: number[] = [];
  buttonColors: string[] = [];
  rulesForSimon: ISimonConfig | undefined;
  @Input() user: IUser | undefined
  startTime: number = 0;
  message: string = '';

  constructor(private quizService: QuizService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void{
    this.numberOfBoxesArray = Array.from({ length: this.numberOfBoxes }, (_, i) => i);

  }

  ngAfterViewChecked(): void {
    this.numberOfBoxesArray = Array.from({ length: this.numberOfBoxes }, (_, i) => i);
  }
  getButtonStyle(index: number) {
    const total = this.numberOfBoxes;
    console.log(this.numberOfBoxes)
    const rotation = 360 / total * index;
    const translation = 30;
    return `rotate(${rotation}deg) translate(${translation}vh)`;
  }

  generateDistinctColors(): string[] {
    const boxNumber : number = this.numberOfBoxes
    const colors: string[] = [];
    const hueDifference = 1240 / boxNumber;
    for (let i = 0; i < boxNumber; i++) {
      const hue = (hueDifference * i) % 1240;
      const color = `hsl(${hue}, 80%, 50%)`;
      colors.push(color);
    }
    console.log(colors)
    console.log(boxNumber)
    console.log(this.numberOfBoxes)
    return colors;
  }

  getButtonColor(i: number) {
    this.buttonColors = this.generateDistinctColors();
    if (this.user && this.user.config.simon.isColorful) {
      return this.buttonColors[i];
    } else {
      return 'gray';
    }
  }
}
