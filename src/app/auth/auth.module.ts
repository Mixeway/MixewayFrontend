import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule, NbCardModule,
    NbCheckboxModule, NbIconModule,
    NbInputModule, NbStepperModule,
} from '@nebular/theme';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './auth.service';
import { InitializeComponent } from './initialize/initialize.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        AuthRoutingModule,

        NbAuthModule,
        NbCardModule,
        ReactiveFormsModule,
        NbStepperModule,
        NbIconModule,
    ],
  declarations: [
    AuthComponent,
    LoginComponent,
    InitializeComponent,
  ],
  providers: [
    AuthGuardService,
    AuthService,
  ],
})
export class AuthModule { }
