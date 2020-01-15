import {Component, Input, OnInit} from '@angular/core';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {Toast} from '../../../@core/utils/Toast';
import {AdminService} from '../../../@core/service/AdminService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Settings} from '../../../@core/Model/Settings';

@Component({
  selector: 'ngx-apikey',
  templateUrl: './apikey.component.html',
  styleUrls: ['./apikey.component.scss'],
})
export class ApikeyComponent implements OnInit {
  auth: boolean;
  index = 1;
  role: string;
  @Input() settings: Settings;
  isAdmin: boolean = false;
  constants: AdminConstants = new AdminConstants();


  constructor(private toast: Toast,
              private adminService: AdminService, private router: Router,
              private cookieService: CookieService) {
    this.role = this.cookieService.get('role');
    if (this.role !== 'ROLE_ADMIN') {
      this.router.navigate(['/pages/dashboard']);
    } else {
      this.isAdmin = true;
    }
  }
  deleteApiKey() {
    return this.adminService.removeApiKey().subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_APIKEY_DELETE);
        this.getSettings();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  generateApiKey() {
    return this.adminService.generateApiKey().subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_APIKEY_GENERATE);
        this.getSettings();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  copyApiKey() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.settings.masterApiKey));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.toast.showToast('success', this.constants.OPERATION_SUCCESS_COPY, this.constants.OPERATION_SUCCESS_COPY_TEXT);
  }

  ngOnInit() {
  }
  getSettings() {
    return this.adminService.getSettings().subscribe(data => {
      this.settings = data;
      this.auth = data.smtpAuth;
    });
  }


}
