import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbCardModule,
  NbChatModule,
  NbIconModule, NbInputModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule, NbTooltipModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ExtraComponentsRoutingModule } from './extra-components-routing.module';

// components
import { ExtraComponentsComponent } from './extra-components.component';
import { SpinnerInTabsComponent } from './spinner/spinner-in-tabs/spinner-in-tabs.component';
import { SpinnerInButtonsComponent } from './spinner/spinner-in-buttons/spinner-in-buttons.component';
import { SpinnerSizesComponent } from './spinner/spinner-sizes/spinner-sizes.component';
import { SpinnerColorComponent } from './spinner/spinner-color/spinner-color.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {
  InteractiveProgressBarComponent,
} from './progress-bar/interactive-progress-bar/interactive-progress-bar.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AlertComponent } from './alert/alert.component';
import { ChatComponent } from './chat/chat.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayCellComponent } from './calendar/day-cell/day-cell.component';
import { CalendarKitFullCalendarShowcaseComponent } from './calendar-kit/calendar-kit.component';
import { CalendarKitMonthCellComponent } from './calendar-kit/month-cell/month-cell.component';
import {MixerProgresComponent} from './mixer-progres/mixer-progres.component';
import { ConfigureInfraComponent } from './configure-infra/configure-infra.component';
import {ConfigureWebComponent} from './configure-web/configure-web.component';
import {ConfigureCodeComponent} from './configure-code/configure-code.component';
import {CiresultColorComponent} from './ciresult-color.component';
import {BugComponent} from './bug-component';
import {ReactiveFormsModule} from '@angular/forms';

const COMPONENTS = [
  ExtraComponentsComponent,
  AlertComponent,
  ProgressBarComponent,
  InteractiveProgressBarComponent,
  SpinnerComponent,
  SpinnerColorComponent,
  SpinnerSizesComponent,
  SpinnerInButtonsComponent,
  SpinnerInTabsComponent,
  CalendarComponent,
  DayCellComponent,
  ChatComponent,
  CalendarKitFullCalendarShowcaseComponent,
  CalendarKitMonthCellComponent,
  MixerProgresComponent,
  ConfigureInfraComponent,
  ConfigureWebComponent,
  ConfigureCodeComponent,
  CiresultColorComponent,
  BugComponent,
];

const MODULES = [
  NbAlertModule,
  NbActionsModule,
  NbButtonModule,
  NbCalendarModule,
  NbCalendarKitModule,
  NbCalendarRangeModule,
  NbCardModule,
  NbChatModule,
  NbIconModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  ThemeModule,
  ExtraComponentsRoutingModule,
];

@NgModule({
  imports: [
    ...MODULES,
    NbTooltipModule,
    ReactiveFormsModule,
    NbInputModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  entryComponents: [
    MixerProgresComponent,
    ConfigureInfraComponent,
    ConfigureWebComponent,
    ConfigureCodeComponent,
    CiresultColorComponent,
    BugComponent,
  ],
  exports: [
    MixerProgresComponent,
    ConfigureInfraComponent,
    ConfigureWebComponent,
    CiresultColorComponent,
    BugComponent,
  ],
})
export class ExtraComponentsModule { }
