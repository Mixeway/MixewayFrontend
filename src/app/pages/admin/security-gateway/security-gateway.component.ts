import { Component, OnInit } from '@angular/core';
import {Toast} from '../../../@core/utils/Toast';
import {AdminService} from '../../../@core/service/AdminService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {SecurityGateway} from '../../../@core/Model/SecurityGateway';

@Component({
  selector: 'ngx-security-gateway',
  templateUrl: './security-gateway.component.html',
  styleUrls: ['./security-gateway.component.scss'],
})
export class SecurityGatewayComponent implements OnInit {
  auth: boolean;
  index = 1;
  role: string;
  securityGatewayForm: FormGroup;
  isAdmin: boolean = false;
  constants: AdminConstants = new AdminConstants();
  securityGateway: SecurityGateway;
  grade: boolean = true;
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
    this.loadSecurityGateway();
    this.securityGatewayForm = this.formBuilder.group({
      grade: [this.securityGateway?.grade, Validators.required],
      vuln: this.securityGateway?.vuln,
      critical: this.securityGateway?.critical,
      high: this.securityGateway?.high,
      medium: this.securityGateway?.medium,
    });
  }

  ngOnInit(): void {
  }

  private loadSecurityGateway() {
    return this.adminService.getSecurityGateway().subscribe(data => {
      this.securityGateway = data;
      this.grade = this.securityGateway.grade;
      this.securityGatewayForm.patchValue({grade: this.securityGateway.grade});
      this.securityGatewayForm.patchValue({vuln: this.securityGateway.vuln});
      this.securityGatewayForm.patchValue({critical: this.securityGateway.critical});
      this.securityGatewayForm.patchValue({high: this.securityGateway.high});
      this.securityGatewayForm.patchValue({medium: this.securityGateway.medium});
    });
  }

  update() {
    return this.adminService.updateSecurityGateway(this.securityGatewayForm.value).subscribe(() => {
        this.toast.showToast('primary', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS);
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  changeGatewayToGrade() {
    this.grade = true;
  }

  changeGatewayToSeverity() {
    this.grade = false;
  }
}
