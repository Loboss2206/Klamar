import { Component, Input } from '@angular/core';




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
    //document.documentElement.style.fontSize = `${slider.value}%`;
    var texts = document.querySelectorAll('p');
    texts.forEach(function (txt) {
      txt.style.fontSize = `${slider.value}%`;
    });
    var inputs = document.querySelectorAll('input');
    inputs.forEach(function (txt) {
      if (txt.className != "slider") txt.style.fontSize = `${slider.value}%`;
    });
    var spans = document.querySelectorAll('span');
    spans.forEach(function (txt) {
      if (txt.id != "slider-text") txt.style.fontSize = `${slider.value}%`;
    });
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function (txt) {
      txt.style.fontSize = `${slider.value}%`;
    });

    var labels = document.querySelectorAll('label');
    labels.forEach(function (txt) {
      txt.style.fontSize = `${slider.value}%`;
    });
    const sliderValueElement = document.getElementById("slider-value") as HTMLDivElement | null;
    if (sliderValueElement) {
      sliderValueElement.style.fontSize = "20px";
    }

    var images = document.querySelectorAll('img');

    images.forEach(function (image) {
      image.style.width = `${slider.value}px`;
      image.style.height = `${slider.value}px`;
    });
  }

}
