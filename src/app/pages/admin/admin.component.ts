import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  NbDialogService,
} from '@nebular/theme';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AdminService} from '../../@core/service/AdminService';
import {RoutingDomain} from '../../@core/Model/RoutingDomain';
import {Proxies} from '../../@core/Model/Proxies';
import {AdminConstants} from '../../@core/constants/AdminConstants';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  routingDomains: RoutingDomain[];
  proxies: Proxies[];
  auth: boolean;
  index = 1;
  role: string;
  settings: any = {};
  isAdmin: boolean = false;
  constants: AdminConstants = new AdminConstants();


  constructor(private dialogService: NbDialogService,
              private adminService: AdminService, private router: Router,
              private cookieService: CookieService, private showProjectService: ShowProjectService) {
    this.role = this.cookieService.get('role');
    if (this.role !== 'ROLE_ADMIN') {
      this.router.navigate(['/pages/dashboard']);
    } else {
      this.isAdmin = true;
    }
    this.loadRoutingService();
    this.getSettings();
    this.loadProxies();
  }

  ngOnInit() {
  }
  loadProxies() {
    return this.showProjectService.getProxies().subscribe(data => {
      this.proxies = data;
    });
  }
  openCreateApiDialog(dialog: TemplateRef<any>, scanner: any) {
    this.dialogService.open(
      dialog,
      { context: scanner });
  }
  getSettings() {
    return this.adminService.getSettings().subscribe(data => {
      this.settings = data;
      this.auth = data.smtpAuth;
    });
  }
  loadRoutingService() {
    return this.showProjectService.getRoutingDomains().subscribe(data => {
      this.routingDomains = data;
    });
  }
}
