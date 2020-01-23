import {Component, OnInit} from '@angular/core';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {Toast} from '../../../@core/utils/Toast';
import {AdminService} from '../../../@core/service/AdminService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, Validators} from '@angular/forms';
import {Settings} from '../../../@core/Model/Settings';

@Component({
  selector: 'ngx-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  auth: boolean;
  index = 1;
  role: string;
  settings: Settings;
  autoInfraScanForm;
  autoWebAppScanForm;
  autoCodeScanForm;
  autoTrendForm;
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
    this.getSettings();
    this.autoInfraScanForm = this.formBuilder.group({
      expression: ['', Validators.required],
    });
    this.autoWebAppScanForm = this.formBuilder.group({
      expression: ['', Validators.required],
    });
    this.autoCodeScanForm = this.formBuilder.group({
      expression: ['', Validators.required],
    });
    this.autoTrendForm = this.formBuilder.group({
      expression: ['', Validators.required],
    });
  }
  updateAutoInfraScan(value: any) {
    return this.adminService.updateInfraCron(value).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SCHEDULERUPDATE);
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, error);
      });
  }

  updateAutoCodeScan(value: any) {
    return this.adminService.updateCodeCron(value).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SCHEDULERUPDATE);
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, error);
      });
  }

  updateAutoWebAppScan(value: any) {
    return this.adminService.updateWebAppCron(value).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SCHEDULERUPDATE);
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, error);
      });
  }
  updateTrendEmail(value: any) {
    return this.adminService.updateTrendCron(value).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SCHEDULERUPDATE);
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, error);
      });
  }
  ngOnInit() {
  }
  getSettings() {
    return this.adminService.getSettings().subscribe(data => {
      this.settings = data;
      this.autoWebAppScanForm.patchValue({
        expression: this.settings.webAppAutoCron,
      });
      this.autoCodeScanForm.patchValue({
        expression: this.settings.codeAutoCron,
      });
      this.autoInfraScanForm.patchValue({
        expression: this.settings.infraAutoCron,
      });
      this.autoTrendForm.patchValue({
        expression: this.settings.trendEmailCron,
      });
      this.auth = data.smtpAuth;
    });
  }
}
