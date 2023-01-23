import { NgModule } from '@angular/core';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule, NbInputModule,
  NbListModule,
  NbMenuModule, NbSelectModule,
  NbTabsetModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { MixerDashboardModule } from './mixer-dashboard/mixer-dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ShowProjectModule} from './show-project/show-project.module';
import {AdminModule} from './admin/admin.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../auth/token.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CicdModule} from './cicd/cicd.module';
import {VulnsModule} from './vulns/vulns.module';
import { SearchComponent } from './search/search.component';
import { VulnAnalyzeComponent } from './vuln-analyze/vuln-analyze.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { KnowlegeBaseComponent } from './knowlege-base/knowlege-base.component';
import { VulnerabilitiesComponent } from './knowlege-base/vulnerabilities/vulnerabilities.component';
import { CisRequirementsComponent } from './knowlege-base/cis-requirements/cis-requirements.component';
import { ScansComponent } from './scans/scans.component';
import {ExtraComponentsModule} from './extra-components/extra-components.module';
import { GlobalStatisticComponent } from './global-statistic/global-statistic.component';
import {NgxEchartsModule} from "ngx-echarts";
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        MiscellaneousModule,
        MixerDashboardModule,
        ShowProjectModule,
        AdminModule,
        FormsModule,
        CicdModule,
        VulnsModule,
        NbCardModule,
        NbAlertModule,
        NbListModule,
        NbTabsetModule,
        Ng2SmartTableModule,
        NbIconModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        ReactiveFormsModule,
        ExtraComponentsModule,
        NgxEchartsModule,
    ],
  declarations: [
    PagesComponent,
    SearchComponent,
    VulnAnalyzeComponent,
    UserProfileComponent,
    KnowlegeBaseComponent,
    VulnerabilitiesComponent,
    CisRequirementsComponent,
    ScansComponent,
    GlobalStatisticComponent,
    StatsDashboardComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class PagesModule {
}
