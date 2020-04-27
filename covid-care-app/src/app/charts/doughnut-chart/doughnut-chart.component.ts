import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input() chartLabel;
  @Input()  chartData;

  public doughnutChartType = 'doughnut';
  public donutColors = [ { backgroundColor: [ '#FF69B4', '#2ec866', '#9400D3', '#00bfff','#FF0000' ]}]; 

  constructor() { }

  ngOnInit() { 
  }

}
