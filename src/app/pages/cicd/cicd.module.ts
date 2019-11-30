import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CicdComponent } from './cicd.component';
import {NbAlertModule, NbCardModule} from '@nebular/theme';
import {CiresultChartComponent} from './ciresult-chart-component';
import {CitrendChartComponent} from './citrend-chart.component';
import {ChartModule} from 'angular2-chartjs';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ExtraComponentsModule} from '../extra-components/extra-components.module';

@NgModule({
  declarations: [CicdComponent, CiresultChartComponent, CitrendChartComponent],
  imports: [
    CommonModule,
    NbCardModule,
    ChartModule,
    Ng2SmartTableModule,
    ExtraComponentsModule,
    NbAlertModule,
  ],
})
export class CicdModule { }
