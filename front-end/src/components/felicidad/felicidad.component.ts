import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../quizButton/button.component";
import {QuizService} from "../../services/quiz-service.service";
import {Router} from "@angular/router";
import * as Tone from "tone";
import * as victoryMidi from "../../assets/sounds/victory.json";
import {StatsService} from "../../services/stats.service";

@Component({
  selector: 'app-felicidad',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './felicidad.component.html',
  styleUrl: './felicidad.component.scss'
})
export class FelicidadComponent implements OnInit {

  constructor(protected quizService: QuizService, private router: Router, private statsService: StatsService) {
  }

  ngOnInit(): void {
    Tone.context.resume().then(() => {
      Tone.start();
        this.playMidi();
    });
    this.statsService.sendStat();
  }

  playMidi() {
    let patternJSON = victoryMidi;
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const events: any[] = [];
    patternJSON.tracks.forEach(track => {
      track.notes.forEach(note => {
        events.push({
          time: note.time,
          note: note.name,
          duration: note.duration
        });
      });
    });

    events.sort((a, b) => a.time - b.time);
    const groupedEvents = events.reduce((groups, event) => {
      const key = event.time;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(event);
      return groups;
    }, {});

    Object.entries(groupedEvents).forEach(([time, group]) => {
      Tone.Transport.schedule((time) => {
        // @ts-ignore
        group.forEach(event => {
          synth.triggerAttackRelease(event.note, event.duration, time);
        });
      }, Number(time));
    });
    Tone.Transport.start();
  }

  restartQuiz() {
    this.quizService.restartQuiz();
    this.router.navigate(['/quiz']);
    this.statsService.createStat()
  }

  ngOnDestroy() {
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }
}
