import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {Severities} from '../../../@core/Model/Severities';
import {ProjectConstants} from '../../../@core/constants/ProjectConstants';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'ngx-vuln-trend-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class VulnTrendPieComponent implements OnDestroy, OnInit, AfterViewInit, OnChanges {
  options: any = {};
  themeSubscription: any;
  _entityId: number;
  constants: ProjectConstants = new ProjectConstants();
  @Input() severities: Severities;

  constructor(private theme: NbThemeService, private showProjectService: ShowProjectService,
              private _route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['severities']) {
      this.drawChart();
    }
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  drawChart() {
    this.options = {
      xAxis: {
        type: 'category',
        data: ['Critical', 'High', 'Medium', 'Low'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [
            { value: this.severities?.Critical, itemStyle: { color: '#F74646' } },
            { value: this.severities?.High, itemStyle: { color: '#EBC04A' } },
            { value: this.severities?.Medium, itemStyle: { color: '#A4EEDA' } },
            { value: this.severities?.Low, itemStyle: { color: '#9FFAF1' } },

          ],
          type: 'bar',
        },
      ],
    };
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

}
