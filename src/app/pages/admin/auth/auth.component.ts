import {Component, Input, OnInit} from '@angular/core';
import {Toast} from '../../../@core/utils/Toast';
import {AdminService} from '../../../@core/service/AdminService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder} from '@angular/forms';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {Settings} from '../../../@core/Model/Settings';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  auth: boolean;
  index = 1;
  role: string;
  @Input() settings: Settings;
  authForm;
  isAdmin: boolean = false;
  constants: AdminConstants = new AdminConstants();
  constructor(private toast: Toast,
              private adminService: AdminService, private router: Router,
              private cookieService: CookieService,
              private formBuilder: FormBuilder) {
    this.role = this.cookieService.get('role');
    if (this.role !== 'ROLE_ADMIN') {
      this.router.navigate(['/pages/dashboard']);
    } else {
      this.isAdmin = true;
    }
    this.authForm = this.formBuilder.group({
      passwordAuth: true,
      certificateAuth: false,
    });
  }
  saveAuth(value: any) {
    return this.adminService.updateAuth(value).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_AUTH);
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED_AUTH);
      });
  }
  ngOnInit() {
    if (this.settings) {
      this.authForm.patchValue({
        passwordAuth: this.settings.passwordAuth,
        certificateAuth: this.settings.certificateAuth,
      });
    }
  }

}
