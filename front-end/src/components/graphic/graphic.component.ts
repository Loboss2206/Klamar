import {Component, OnInit, Input, input} from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  standalone: true,
  imports: [],
})
export class GraphicComponent implements OnInit {

  @Input() chartId!: string;

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.createChart();

    },1000)
  }

  public chart: any;

  createChart() {

    this.chart = new Chart(this.chartId, {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio: 1.5
      }

    });
  }
}
