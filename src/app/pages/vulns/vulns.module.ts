import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VulnsComponent } from './vulns.component';
import {NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbTooltipModule} from '@nebular/theme';
import {NgxEchartsModule} from 'ngx-echarts';
import {Ng2SmartTableModule} from 'ng2-smart-table';

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
        Ng2SmartTableModule,
    ],
})
export class VulnsModule { }
