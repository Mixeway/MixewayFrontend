import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule, NbCheckboxModule,
    NbIconModule,
    NbInputModule, NbListModule, NbRadioModule,
    NbSelectModule,
    NbTabsetModule, NbTooltipModule,
} from '@nebular/theme';
import {AdminService} from '../../@core/service/AdminService';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {ReactiveFormsModule} from '@angular/forms';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { RoutingDomainComponent } from './routing-domain/routing-domain.component';
import { ProxyComponent } from './proxy/proxy.component';
import { ScanStrategyComponent } from './scan-strategy/scan-strategy.component';
import { AuthComponent } from './auth/auth.component';
import { SmtpComponent } from './smtp/smtp.component';
import { ApikeyComponent } from './apikey/apikey.component';
import { ScannerComponent } from './scanner/scanner.component';
import { UserComponent } from './user/user.component';
import {MultiSelectModule} from '@syncfusion/ej2-angular-dropdowns';
import { WebAppStrategyComponent } from './web-app-strategy/web-app-strategy.component';
import { VulnAuditorComponent } from './vuln-auditor/vuln-auditor.component';
import { SecurityGatewayComponent } from './security-gateway/security-gateway.component';
import { GitcredentialsComponent } from './gitcredentials/gitcredentials.component';

@NgModule({
  declarations: [
    AdminComponent,
    SchedulerComponent,
    RoutingDomainComponent,
    ProxyComponent,
    ScanStrategyComponent,
    AuthComponent,
    SmtpComponent,
    ApikeyComponent,
    ScannerComponent,
    UserComponent,
    WebAppStrategyComponent,
    VulnAuditorComponent,
    SecurityGatewayComponent,
    GitcredentialsComponent,
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
        MultiSelectModule,
        NbRadioModule,
    ],
  providers: [
    AdminService,
    ShowProjectService,
  ],
})
export class AdminModule { }

