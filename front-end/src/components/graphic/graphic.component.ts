import {Component, OnInit, Input, input} from '@angular/core';
import Chart from 'chart.js/auto';
import {GraphicService} from "../../services/graphic.service";


@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  standalone: true,
  imports: [],
})
export class GraphicComponent implements OnInit {

  @Input() chartId!: string;
  @Input() data: number[] = [];
  @Input() titre!: string;
  @Input() date: string[] = [];
  public percentageSuccess: number = 0;

  ngOnInit(): void {
    setTimeout(()=>{
      this.createChart();
      this.calculateSuccessPercentage();
    },1)
  }

  public chart: any;

  createChart() {

    this.chart = new Chart(this.chartId, {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.date,
        datasets: [
          {
            label: "pourcentage de réussite",
            data: this.data,
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio: 1.5,
        scales: {
          y: {
            min: 0, // Valeur minimale de l'axe y
            max: 100 // Valeur maximale de l'axe y
          }
        }
      }
    });
  }
  calculateSuccessPercentage() {
    const sum = this.data.reduce((acc, curr) => acc + curr, 0);
    const average = sum / this.data.length;
    this.percentageSuccess = Math.round(average);
  }
}
