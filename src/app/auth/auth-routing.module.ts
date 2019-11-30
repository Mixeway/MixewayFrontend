import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NbAuthComponent} from '@nebular/auth';
import {LoginComponent} from './login/login.component';
import {InitializeComponent} from './initialize/initialize.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'init',
        component: InitializeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
