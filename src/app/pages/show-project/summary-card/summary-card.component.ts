import {Component, Input, OnInit} from '@angular/core';



export interface GaugeChart {
  value: number;
}
@Component({
  selector: 'ngx-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent implements OnInit {
  gaugeChartData: GaugeChart[];
  name: string;
  color: string;
  value: number;
  @Input()
  cardDetails: any;
  constructor() { }

  ngOnInit() {
    this.name = 'Test';
  }

}
