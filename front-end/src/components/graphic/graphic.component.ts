import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  standalone: true,
  imports: [],
})
export class GraphicComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() chartId!: string;
  @Input() data: number[] = [];
  @Input() titre!: string;
  @Input() date: string[] = [];
  public percentageSuccess: number = 0;
  public chart: any;

  ngOnInit(): void {
    this.calculateSuccessPercentage();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.unload();
      this.createChart();
    }, 500);
  }

  createChart() {
    const canvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'line', // this denotes the type of chart
        data: {
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
    } else {
      console.error(`Element with id ${this.chartId} not found`);
    }
  }

  calculateSuccessPercentage() {
    const sum = this.data.reduce((acc, curr) => acc + curr, 0);
    const average = sum / this.data.length;
    this.percentageSuccess = Math.round(average);
  }

  unload() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnDestroy() {
    this.unload();
  }
}
