import { Component, Input, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-zoomSlider',
  standalone: true,
  imports: [
  ],
  templateUrl: './zoomSlider.component.html',
  styleUrl: './zoomSlider.component.scss'
})
export class ZoomSliderComponent {
  @Input() text!: string;
  @Input() color?: { correct: boolean; wrong: boolean };

  constructor() {
  }

}
