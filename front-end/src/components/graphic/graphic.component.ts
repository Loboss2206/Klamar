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
  positiveData: number[] = [];
  positiveDate: string[] = []
  public percentageSuccess: number = 0;
  public chart: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.includePositiveData();
      this.calculateSuccessPercentage();
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
          labels: this.positiveDate,
          datasets: [
            {
              label: "pourcentage de réussite",
              data: this.positiveData,
              backgroundColor: 'blue',
              pointRadius: 9, // Make dots bigger
              pointHoverRadius: 12, // Make dots bigger on hover
              borderWidth: 6, // Make line thicker
            },
          ]
        },
        options: {
          aspectRatio: 1.5,
          scales: {
            y: {
              min: -20, // Valeur minimale de l'axe y
              max: 120, // Valeur maximale de l'axe y
              ticks: {
                font: {
                  size: 16, // Font size for y-axis labels
                },
                stepSize: 20, // Display labels at intervals of 20
                callback: function(value: string | number) {
                  if (typeof value === 'number' && value >= 0 && value <= 100) {
                    return value;
                  }
                  return '';
                }
              },
              title: {
                display: true,
                text: 'Pourcentage',
                font: {
                  size: 18, // Font size for y-axis title
                },
              },
            },
            x: {
              ticks: {
                font: {
                  size: 14, // Font size for x-axis labels
                },
              },
              title: {
                display: true,
                text: 'Dates',
                font: {
                  size: 18, // Font size for x-axis title
                },
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 16, // Font size for legend
                },
              },
            },
            title: {
              display: true,
              text: this.titre,
              font: {
                size: 20, // Font size for chart title
              },
            },
          },
        }
      });
    } else {
      console.error(`Element with id ${this.chartId} not found`);
    }
  }

  calculateSuccessPercentage() {
    console.log("WSHHSHSHSHSHSHSHS")
    console.log(this.positiveData)
    const sum = this.positiveData.reduce((acc, curr) => acc + curr, 0);
    console.log(sum)
    const average = this.positiveData.length > 0 ? sum / this.positiveData.length : 0;
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

  private includePositiveData() {
    for (let i = 0; i < this.data.length; i++){
      if (this.data[i]>=0){
        this.positiveData.push(this.data[i]);
        this.positiveDate.push(this.date[i]);
      }
    }
  }
}
