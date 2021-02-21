import {Component, OnInit} from '@angular/core';
import {SmoothieChart, TimeSeries} from 'smoothie';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {


  public colors: any = [
    {sroke: 'rgba(0,255,0,1)', fill: 'rgba(0,255,0,0.2)'},
    {sroke: 'rgba(255,0,0,1)', fill: 'rgba(0,255,0,0.2)'}
  ];

  index: number = -1;

  constructor() {
  }

  ngOnInit(): void {
    this.getData();
  }

  public randomColor() {
  console.log('eejrejrh')
    ++this.index;
    if (this.index >= this.colors.length) {
      this.index = 0;
    }
    return this.colors[this.index];

  }

  public getData() {
    //this.randomColor();
    var pages = ['U1', 'U2'];
    var courbe = [];
    var smoothieChart = new SmoothieChart({tooltip: true});

    smoothieChart.streamTo(<HTMLCanvasElement> document.getElementById('chart2'), 500);

    pages.forEach((v) =>{

      courbe[v] = new TimeSeries();
      var col = this.randomColor();
      smoothieChart.addTimeSeries(courbe[v], {strokeStyle: col.sroke, fillStyle: col.fill, lineWidth: 2});

    });

    var stockEventSource = new EventSource(' http://localhost:8080/analytics');

    stockEventSource.addEventListener('message', function(event) {
      pages.forEach(function(v) {
        let val = JSON.parse(event.data)[v];
        courbe[v].append(new Date().getTime(), val);
      });
    });
  }
}
