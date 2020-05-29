import {Component, Input, OnInit} from '@angular/core';
import {Settings} from '../../../@core/Model/Settings';
import {FormBuilder, Validators} from '@angular/forms';
import {AdminService} from '../../../@core/service/AdminService';
import {Toast} from '../../../@core/utils/Toast';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-vuln-auditor',
  templateUrl: './vuln-auditor.component.html',
  styleUrls: ['./vuln-auditor.component.scss'],
})
export class VulnAuditorComponent implements OnInit {
  @Input() settings: Settings;
  vulnAuditorForm: any;
  enabled: boolean = false;
  disabled: boolean = true;
  role: string;
  isAdmin: boolean = false;
  constants: AdminConstants = new AdminConstants();
  options: any;
  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private toast: Toast,
              private cookieService: CookieService, private router: Router) {
    this.role = this.cookieService.get('role');
    if (this.role !== 'ROLE_ADMIN') {
      this.router.navigate(['/pages/dashboard']);
    } else {
      this.isAdmin = true;
    }
  }

  ngOnInit() {
    this.vulnAuditorForm = this.formBuilder.group({
      enabled: [this.settings.vulnAuditorEnable, Validators.required],
      url: [this.settings.vulnAuditorUrl, Validators.required],
    });
    this.options = [
      { value: true, label: 'Enabled', checked: this.settings.vulnAuditorEnable === true },
      { value: false, label: 'Disabled', checked: this.settings.vulnAuditorEnable === false },
    ];
  }

  save(value: any) {
    return this.adminService.updateVulnAuditor(value).subscribe(() => {
        this.toast.showToast('primary', this.constants.TOAST_SUCCESS,
          this.constants.OPERATION_SUCCESS_VULNAUDITOR_UPDATE);
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED_VULNAUDITOR);
      });
  }
}
