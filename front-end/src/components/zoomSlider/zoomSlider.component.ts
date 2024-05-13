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
    const oldValue = this.parsedValue;
    const zoomLevel = slider.value;
    this.parsedValue = Math.floor(slider.value).toString();

    (document.getElementsByTagName('html')[0].style as any).zoom = zoomLevel + "%"
    document.querySelectorAll('.zoomSlider').forEach((element) => {
      ((element as HTMLElement).style as any).zoom = oldValue + "%";
    });

  }

}
