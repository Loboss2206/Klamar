import {Component, Input} from '@angular/core';




@Component({
  selector: 'app-zoomSlider',
  standalone: true,
  imports: [],
  templateUrl: './zoomSlider.component.html',
  styleUrl: './zoomSlider.component.scss'
})
export class ZoomSliderComponent {
  @Input() text!: string;
  @Input() color?: { correct: boolean; wrong: boolean };

  sliderValueLeft = '0%';
  parsedValue: string = '0';

  constructor() {
  }

  onSliderChange(event: any) {
    const slider = event.target;
    const sliderPosition = slider.value / slider.max;
    this.parsedValue = Math.floor(slider.value).toString();
    if (slider.value === slider.min) {
      this.sliderValueLeft = ((sliderPosition * 100) + 2) + '%';
    } else if (slider.value === slider.max) {
      this.sliderValueLeft = ((sliderPosition * 100) - 2) + '%';
    } else {
      this.sliderValueLeft = (sliderPosition * 100) + '%';
    }
  }

}
