import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbIconModule,
  NbInputModule, NbListModule,
  NbSelectModule,
  NbTabsetModule, NbTooltipModule,
} from '@nebular/theme';
import {AdminService} from '../../@core/service/AdminService';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbTabsetModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    ReactiveFormsModule,
    NbIconModule,
    NbCheckboxModule,
    NbAlertModule,
    NbTooltipModule,
    NbListModule,
  ],
  providers: [
    AdminService,
    ShowProjectService,
  ],
})
export class AdminModule { }

