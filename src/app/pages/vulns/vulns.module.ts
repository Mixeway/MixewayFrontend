import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VulnsComponent } from './vulns.component';
import {NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbTooltipModule} from '@nebular/theme';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  declarations: [VulnsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NgxEchartsModule,
    NbIconModule,
    NbButtonModule,
    NbAlertModule,
    NbTooltipModule,
  ],
})
export class VulnsModule { }
