import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Proxies} from '../../../@core/Model/Proxies';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {NbDialogService} from '@nebular/theme';
import {Toast} from '../../../@core/utils/Toast';
import {AdminService} from '../../../@core/service/AdminService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.scss'],
})
export class ProxyComponent implements OnInit {
  @Input() proxies: Proxies[];
  auth: boolean;
  index = 1;
  role: string;
  settings: any = {};
  proxyForm;
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
    this.proxyForm = this.formBuilder.group({
      ip: ['', Validators.required],
      port: ['', Validators.required],
      description: ['', Validators.required],
      username: '',
      password: '',
    });
  }
  openCreateApiDialog(dialog: TemplateRef<any>, scanner: any) {
    this.dialogService.open(
      dialog,
      { context: scanner });
  }
  deleteProxy(id: any) {
    return this.adminService.deleteProxy(id).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_PROXY_DELETE);
        this.loadProxies();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }


  addProxies(value: any, ref) {
    return this.adminService.createProxy(value).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_PROXY_ADD);
        this.loadProxies();
        ref.close();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }
  loadProxies() {
    return this.showProjectService.getProxies().subscribe(data => {
      this.proxies = data;
    });
  }

  ngOnInit() {
  }

}
