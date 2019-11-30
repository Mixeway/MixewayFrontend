import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
} from '@nebular/theme';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AdminService} from '../../@core/service/AdminService';
import {RoutingDomain} from '../../@core/Model/RoutingDomain';
import {User} from '../../@core/Model/User';
import {Scanner} from '../../@core/Model/Scanner';
import {FormBuilder, Validators} from '@angular/forms';
import {Toast} from '../../@core/utils/Toast';
import {Proxies} from '../../@core/Model/Proxies';
import {AdminConstants} from '../../@core/constants/AdminConstants';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  basicAuth: boolean = false;
  showFortifySCA: boolean = false;
  showAcunetix: boolean = false;
  showNessus: boolean = false;
  masterApiKey: string = '';
  scannerTypes: any;
  routingDomains: RoutingDomain[];
  proxies: Proxies[];
  auth: boolean;
  index = 1;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  role: string;
  users: User[];
  scanners: Scanner[];
  settings: any = {};
  userForm;
  scannerForm;
  smtpForm;
  changePasswordForm;
  rfwForm;
  authForm;
  proxyForm;
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
    this.userForm = this.formBuilder.group({
      userRole:  ['', Validators.required],
      userCN:  ['', Validators.required],
      userUsername: ['', Validators.required],
      userPassword: '',
      passwordAuth: false,
    });
    this.scannerForm = this.formBuilder.group({
      scannerType:  [0, [Validators.required, Validators.min(1)]],
      routingDomain:  [0, Validators.required],
      proxy:  0,
      apiUrl:  ['', Validators.required],
      username:  '',
      password:  '',
      accesskey:  '',
      secretkey:  '',
      apiKey:  '',
      cloudCtrlToken:  '',
    });
    this.rfwForm = this.formBuilder.group({
      rfwUrl:  ['', Validators.required],
      rfwUsername:  ['', Validators.required],
      rfwPassword:  ['', Validators.required],
      rfwScannerIp:  ['', Validators.required],
    });
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
    });
    this.authForm = this.formBuilder.group({
      passwordAuth: true,
      certificateAuth: false,
    });
    this.routingDomainForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.proxyForm = this.formBuilder.group({
      ip: ['', Validators.required],
      port: ['', Validators.required],
      description: ['', Validators.required],
      username: '',
      password: '',
    });
    this.smtpForm = this.formBuilder.group({
      smtpAuth: [true, Validators.required],
      smtpTls: [true, Validators.required],
      smtpHost: ['', Validators.required],
      smtpPort: [587, Validators.required],
      smtpUsername: ['', Validators.required],
      smtpPassword: ['**************', Validators.required],
    });
    this.loadProxies();
    this.loadRoutingService();
    this.loadScannerTypes();
    this.loadUsers();
    this.loadScanners();
    this.getSettings();
  }

  ngOnInit() {
  }
  openCreateApiDialog(dialog: TemplateRef<any>, scanner: any) {
    this.dialogService.open(
      dialog,
      { context: scanner });
  }

  onChange($event) {
    if ($event === this.constants.SCANNER_TYPE_ACUNETIX) {
      this.showAcunetix = true;
      this.showFortifySCA = false;
      this.showNessus = false;
      this.basicAuth = false;
    } else if ( $event === this.constants.SCANNER_TYPE_NESSUS) {
      this.showAcunetix = false;
      this.showFortifySCA = false;
      this.showNessus = true;
      this.basicAuth = false;
    } else if ( $event === this.constants.SCANNER_TYPE_OPENVAS) {
      this.showAcunetix = false;
      this.showFortifySCA = false;
      this.showNessus = false;
      this.basicAuth = true;
    } else if ( $event === this.constants.SCANNER_TYPE_FORTIFYSCA) {
      this.showAcunetix = false;
      this.showFortifySCA = true;
      this.showNessus = false;
      this.basicAuth = false;
    }else {
      this.showAcunetix = false;
      this.showFortifySCA = false;
      this.showNessus = false;
      this.basicAuth = true;
    }
  }

  getContent(id) {
    const obj = this.scannerTypes.filter(function(node) {
      return node.id === id;
    });

    return obj.name;
  }
  loadRoutingService() {
    return this.showProjectService.getRoutingDomains().subscribe(data => {
      this.routingDomains = data;
    });
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
  loadUsers() {
    return this.adminService.getUsers().subscribe(data => {
      // @ts-ignore
      this.users = data.body;
    });
  }
  loadScanners() {
    return this.adminService.getScanners().subscribe(data => {
      this.scanners = data;
    });
  }

  saveRfw(value: any, ref, id) {
    if (this.rfwForm.valid) {
      return this.adminService.addRfw(id, this.rfwForm.value).subscribe(data => {
          this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_RFW_SAVE);
          this.loadUsers();
          ref.close();
        },
        error => {
          this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
        });
    }
  }

  saveScanner(value: any, ref) {
    if (this.scannerForm.valid) {
      return this.adminService.addScanner(this.scannerForm.value).subscribe(data => {
          this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SCANNER_SAVE);
          this.loadScanners();
          ref.close();
        },
        error => {
          this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
        });
    }
  }

  saveUser(value: any, ref) {
    if (this.userForm.valid) {
      return this.adminService.addUser(this.userForm.value).subscribe(data => {
          this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_USER_SAVE);
          this.loadUsers();
          ref.close();
        },
        error => {
          this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
        });
    }
  }

  enableUser(id: number) {
    return this.adminService.enableUser(id).subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_USER_UNBLOCK);
        this.loadUsers();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  disableUser(id: number) {
    return this.adminService.disableUser(id).subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_USER_BLOCK);
        this.loadUsers();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  deleteScanner(id: number) {
    return this.adminService.deleteScanner(id).subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SCANNER_DELETE);
        this.loadScanners();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  testScanner(id: number) {
    return this.adminService.testScanner(id).subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SCANNER_TEST);
        this.loadScanners();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  changePassowordSubmit(value: any, ref, id) {
    if (this.changePasswordForm.valid) {
      return this.adminService.changePassword(id, this.changePasswordForm.value).subscribe(data => {
          this.toast.showToast('success', this.constants.TOAST_SUCCESS,
            this.constants.OPERATION_SUCCESS_PASSWORD_CHANGE);
          this.loadUsers();
          ref.close();
        },
        error => {
          this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
        });
    }
  }
  getSettings() {
    return this.adminService.getSettings().subscribe(data => {
        this.settings = data;
        this.auth = data.smtpAuth;
      });
  }

  saveAuth(value: any) {
    return this.adminService.updateAuth(value).subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_AUTH);
        this.getSettings();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED_AUTH);
        this.getSettings();
      });
  }

  deleteApiKey() {
    return this.adminService.removeApiKey().subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_APIKEY_DELETE);
        this.getSettings();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  generateApiKey() {
    return this.adminService.generateApiKey().subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_APIKEY_GENERATE);
        this.getSettings();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  copyApiKey() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.masterApiKey));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.toast.showToast('success', this.constants.OPERATION_SUCCESS_COPY, this.constants.OPERATION_SUCCESS_COPY_TEXT);
  }

  deleteRoutingDomain(id: number) {
    return this.adminService.deleteRoutingDomain(id).subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS,
          this.constants.OPERATION_SUCCESS_ROUTINGDOMAIN_DELETE);
        this.loadRoutingService();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED,
          this.constants.OPERATION_FAILED_ROUTINGDOMAIN_DELETE);
      });
  }

  deleteProxy(id: any) {
    return this.adminService.deleteProxy(id).subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_PROXY_DELETE);
        this.loadProxies();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  addNewRoutingDomain(value: any, ref) {
    return this.adminService.createRoutingDomain(value).subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS,
          this.constants.OPERATION_SUCCESS_ROUTINGDOMAIN_ADD);
        this.loadRoutingService();
        ref.close();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED_ROUTINGDOMAIN_ADD);
      });
  }

  addProxies(value: any, ref) {
    return this.adminService.createProxy(value).subscribe(data => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_PROXY_ADD);
        this.loadProxies();
        ref.close();
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  saveSmtp(value: any) {
    return this.adminService.updateSmtp(value).subscribe(data => {
        this.toast.showToast('primary', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SMTP_UPDATE);
      },
      error => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED_SMTP);
      });
  }
}
