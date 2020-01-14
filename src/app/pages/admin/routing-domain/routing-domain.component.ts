import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {RoutingDomain} from '../../../@core/Model/RoutingDomain';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {NbDialogService} from '@nebular/theme';
import {Toast} from '../../../@core/utils/Toast';
import {AdminService} from '../../../@core/service/AdminService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-routing-domain',
  templateUrl: './routing-domain.component.html',
  styleUrls: ['./routing-domain.component.scss'],
})
export class RoutingDomainComponent implements OnInit {
  @Input() routingDomains: RoutingDomain[];
  auth: boolean;
  index = 1;
  role: string;
  settings: any = {};
  routingDomainForm;
  isAdmin: boolean = false;
  constants: AdminConstants = new AdminConstants();


  constructor(private dialogService: NbDialogService, private toast: Toast,
              private adminService: AdminService, private router: Router,
              private cookieService: CookieService, private showProjectService: ShowProjectService,
              private formBuilder: FormBuilder) {
    this.role = this.cookieService.get('role');
    if (this.role !== 'ROLE_ADMIN') {
      this.router.navigate(['/pages/dashboard']);
    } else {
      this.isAdmin = true;
    }
    this.routingDomainForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  openCreateApiDialog(dialog: TemplateRef<any>, scanner: any) {
    this.dialogService.open(
      dialog,
      { context: scanner });
  }
  deleteRoutingDomain(id: number) {
    return this.adminService.deleteRoutingDomain(id).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS,
          this.constants.OPERATION_SUCCESS_ROUTINGDOMAIN_DELETE);
        this.loadRoutingService();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED,
          this.constants.OPERATION_FAILED_ROUTINGDOMAIN_DELETE);
      });
  }

  addNewRoutingDomain(value: any, ref) {
    return this.adminService.createRoutingDomain(value).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS,
          this.constants.OPERATION_SUCCESS_ROUTINGDOMAIN_ADD);
        this.loadRoutingService();
        ref.close();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED_ROUTINGDOMAIN_ADD);
      });
  }
  ngOnInit() {
  }
  loadRoutingService() {
    return this.showProjectService.getRoutingDomains().subscribe(data => {
      this.routingDomains = data;
    });
  }
}
