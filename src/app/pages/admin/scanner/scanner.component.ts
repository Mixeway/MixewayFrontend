import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {RoutingDomain} from '../../../@core/Model/RoutingDomain';
import {Proxies} from '../../../@core/Model/Proxies';
import {Scanner, ScannerType} from '../../../@core/Model/Scanner';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {NbDialogService} from '@nebular/theme';
import {Toast} from '../../../@core/utils/Toast';
import {AdminService} from '../../../@core/service/AdminService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  basicAuth: boolean = false;
  showFortifySCA: boolean = false;
  showAcunetix: boolean = false;
  showNessus: boolean = false;
  @Input() scannerTypes: ScannerType[];
  auth: boolean;
  index = 1;
  role: string;
  scanners: Scanner[];
  settings: any = {};
  scannerForm;
  rfwForm;
  isAdmin: boolean = false;
  @Input() routingDomains: RoutingDomain[];
  @Input() proxies: Proxies[];
  constants: AdminConstants = new AdminConstants();


  constructor(private dialogService: NbDialogService, private toast: Toast,
              private adminService: AdminService, private router: Router,
              private cookieService: CookieService,
              private formBuilder: FormBuilder) {
    this.role = this.cookieService.get('role');
    if (this.role !== 'ROLE_ADMIN') {
      this.router.navigate(['/pages/dashboard']);
    } else {
      this.isAdmin = true;
    }
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
    this.loadScanners();
  }

  ngOnInit() {
  }
  openCreateApiDialog(dialog: TemplateRef<any>, scanner: any) {
    this.dialogService.open(
      dialog,
      { context: scanner });
  }
  onChange($event) {
    const scannerType = this.scannerTypes.filter(st => st.name === $event);
    this.showAcunetix = scannerType[0].authapikey;
    this.showFortifySCA = scannerType[0].authcloudctrltoken;
    this.showNessus = scannerType[0].authsecrettoken;
    this.basicAuth = scannerType[0].authpassword;
  }

  loadScanners() {
    return this.adminService.getScanners().subscribe(data => {
      this.scanners = data;
    });
  }

  saveRfw(value: any, ref, id) {
    if (this.rfwForm.valid) {
      return this.adminService.addRfw(id, this.rfwForm.value).subscribe(() => {
          this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_RFW_SAVE);
          ref.close();
        },
        () => {
          this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
        });
    }
  }

  saveScanner(value: any, ref) {
    if (this.scannerForm.valid) {
      return this.adminService.addScanner(this.scannerForm.value).subscribe(() => {
          this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SCANNER_SAVE);
          this.loadScanners();
          ref.close();
        },
        (error) => {
          if (error === '409') {
            this.toast.showToast('danger', this.constants.TOAST_FAILED,
              this.constants.OPERATION_FAILED_SCANNER_POLICY_CONFLICT);
          } else {
            this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
          }
        });
    }
  }
  deleteScanner(id: number) {
    return this.adminService.deleteScanner(id).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SCANNER_DELETE);
        this.loadScanners();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  testScanner(id: number) {
    return this.adminService.testScanner(id).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SCANNER_TEST);
        this.loadScanners();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }
}
