import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { MixerDashboardComponent } from './mixer-dashboard/mixer-dashboard-component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {ShowProjectComponent} from './show-project/show-project.component';
import {AdminComponent} from './admin/admin.component';
import {VulnsComponent} from './vulns/vulns.component';
import {CicdComponent} from './cicd/cicd.component';
import {SearchComponent} from './search/search.component';
import {VulnAnalyzeComponent} from './vuln-analyze/vuln-analyze.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {KnowlegeBaseComponent} from './knowlege-base/knowlege-base.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: MixerDashboardComponent,
    },
    {
      path: 'show/project/:projectid',
      component: ShowProjectComponent,
    },
    {
      path: 'vulns',
      component: VulnsComponent,
    },
    {
      path: 'cicd',
      component: CicdComponent,
    },
    {
      path: 'admin',
      component: AdminComponent,
    },
    {
      path: 'profile',
      component: UserProfileComponent,
    },
    {
      path: 'vulnsanalyze',
      component: VulnAnalyzeComponent,
    },
    {
      path: 'kb',
      component: KnowlegeBaseComponent,
    },
    {
      path: 'search/:search',
      component: SearchComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
