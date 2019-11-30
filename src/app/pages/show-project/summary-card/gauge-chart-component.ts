import { Component, Input, OnChanges, OnDestroy} from '@angular/core';

@Component({
  selector: 'ngx-gauge-chart',
  styleUrls: ['./summary-card.component.scss'],
  template: `
    <div echarts
         class="echart"
         [options]="options">
    </div>
  `,
})
export class GaugeChartComponent implements OnDestroy, OnChanges {
  @Input() risk: number;
  /* tslint:disable:no-unused-variable */
  private alive = true;
  options: any;

  ngOnChanges(): void {
    this.options = {
      series: [
        {
          startAngle: 180,
          endAngle: 0,
          thick: 15,
          type: 'gauge',
          showSymbol: false,
          data: [{value: this.risk, name: ''}],
          axisLabel: {
            show: false,
          },
        },
      ],
    };
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
