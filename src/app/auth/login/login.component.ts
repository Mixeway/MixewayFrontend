import {Component, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../@core/service/AuthService';
import {Toast} from '../../@core/utils/Toast';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginConstants} from '../../@core/constants/LoginConstants';
import {StatusEntity} from '../../@core/Model/StatusEntity';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordAuthForm;
  error: string = '';
  constants: LoginConstants = new LoginConstants();
  statusEntity: StatusEntity = new StatusEntity();
  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder,
              private authService: AuthService, private toast: Toast, private router: Router,
              private route: ActivatedRoute) {
    this.status();
    this.passwordAuthForm = this.formBuilder.group({
      username:  ['', Validators.required],
      password:  ['', Validators.required],
    });
  }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.error = queryParams['error'];
  }
  x509Login() {
    this.document.location.href = environment.jwtSource;
  }
  status() {
    return this.authService.status().subscribe(data => {
      this.statusEntity = data;
        if (!data.initialized) {
          this.router.navigate(['/auth/init']);
        }
      },
      () => {
        this.toast.showToast('danger', this.constants.FAILURE,
          this.constants.API_ACCESS_DENIED);
      });
  }

  authUsingPassword() {
    if (this.passwordAuthForm.valid) {
      return this.authService.login(this.passwordAuthForm.value).subscribe(() => {
          this.toast.showToast('success', this.constants.SUCCESS,
            this.constants.LOGIN_SUCCESS);
          this.router.navigate(['/pages/dashboard']);
        },
        () => {
          this.toast.showToast('danger', this.constants.FAILURE,
            this.constants.LOGIN_FAILURE);
        });
    }
  }
}
