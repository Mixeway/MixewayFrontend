import {Component, Input, OnInit} from '@angular/core';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {Toast} from '../../../@core/utils/Toast';
import {AdminService} from '../../../@core/service/AdminService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../../@core/Model/Settings';

@Component({
  selector: 'ngx-smtp',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.scss'],
})
export class SmtpComponent implements OnInit {
  @Input() settings: Settings;
  auth: boolean;
  index = 1;
  role: string;
  smtpForm: FormGroup;
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
  }
  saveSmtp(value: any) {
    return this.adminService.updateSmtp(value).subscribe(() => {
        this.toast.showToast('primary', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SMTP_UPDATE);
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED_SMTP);
      });
  }
  ngOnInit() {
    this.smtpForm = this.formBuilder.group({
      smtpAuth: [this.settings.smtpAuth, Validators.required],
      smtpTls: [this.settings.smtpTls, Validators.required],
      smtpHost: [this.settings.smtpHost, Validators.required],
      smtpPort: [this.settings.smtpPort, Validators.required],
      domain: [this.settings.domain, Validators.required],
      smtpUsername: [this.settings.smtpUsername, Validators.required],
      smtpPassword: ['**************', Validators.required],
    });
  }

}
