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
import {Settings} from '../../@core/Model/Settings';
import {ScannerType} from '../../@core/Model/Scanner';

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
  settings: Settings;
  isAdmin: boolean = false;
  constants: AdminConstants = new AdminConstants();
  scannerTypes: ScannerType[];

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
    this.loadProxies();
    this.loadScannerTypes();
  }

  ngOnInit() {
    this.getSettings();
  }
  loadProxies() {
    return this.showProjectService.getProxies().subscribe(data => {
      this.proxies = data;
    });
  }
  loadScannerTypes() {
    return this.adminService.getScannerTypes().subscribe(data => {
      this.scannerTypes = data;
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

  test($event: any) {
    if ($event.tabTitle === 'Scanners') {
      this.loadProxies();
      this.loadRoutingService();
    }
  }
}
