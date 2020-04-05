import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {MixerProgresComponent} from '../../../extra-components/mixer-progres/mixer-progres.component';
import {ShowProjectService} from '../../../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {WebApps} from '../../../../@core/Model/WebApps';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfigureWebComponent} from '../../../extra-components/configure-web/configure-web.component';
import {Toast} from '../../../../@core/utils/Toast';
import {ProjectConstants} from '../../../../@core/constants/ProjectConstants';
import {ScannerType} from '../../../../@core/Model/Scanner';
import {RoutingDomain} from '../../../../@core/Model/RoutingDomain';
@Component({
  selector: 'ngx-web-configure-tab',
  templateUrl: './web-configure-tab.component.html',
  styleUrls: ['./web-configure-tab.component.scss'],
})
export class WebConfigureTabComponent implements OnInit {
  // @ts-ignore
  @ViewChild('addWebApp')
  addDialog: TemplateRef<any>;
  @Input() scannerTypes: ScannerType[];
  @Input() routingDomains: RoutingDomain[];
  showHeaders: boolean = false;
  showPasswords: boolean = false;
  settings: any;
  webScanRunSelectedButton: boolean = true;
  webAutomaticScanButton: boolean = true;
  webRunAllScanButton: boolean = false;
  _entityId: number;
  webApps: WebApps;
  role: any;
  webAppForm;
  selectedRows;
  canEdit: boolean = false;
  loading: boolean = true;
  numberOfRunningTest: number = 0;
  constants: ProjectConstants = new ProjectConstants();
  constructor(private dialogService: NbDialogService,
              private showProjectService: ShowProjectService, private _route: ActivatedRoute, private router: Router,
              private cookieService: CookieService, private formBuilder: FormBuilder, private toast: Toast) {
    this.role = this.cookieService.get('role');
    this.canEdit = (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_EDITOR_RUNNER');
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }
    this.prepareSettingsTable();
    this.loadWebApps();
    this.webAppForm = this.formBuilder.group({
      webAppUrl:  ['', Validators.required],
      webAppHeaders: '',
      webAppUsername: '',
      webAppPassword: '',
      scanPublic:  false,
      routingDomainForAsset: [0, Validators.min(1)],
    });
  }
  loadWebApps() {
    return this.showProjectService.getWebApps(this._entityId).subscribe(data => {
      this.webApps = data;
      this.webAutomaticScanButton = this.webApps.webAppAutoScan;
      this.numberOfRunningTest = this.webApps.webAppModels.filter(a => a.running === true).length;
      this.webRunAllScanButton = this.numberOfRunningTest > 0;
      this.loading = false;
    });
  }
  ngOnInit() {
  }
  onAdd() {
    this.openCreateApiDialog(this.addDialog);
  }
  runTestSingle(event) {
    window.confirm('running ' + event.data.ipAddress);
  }
  onRowSelected(event) {
     this.webScanRunSelectedButton = event.selected.length <= 0;
  }

  openCreateApiDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }
  prepareSettingsTable() {
    const that = this;
    const actions: any = {
      title: this.constants.PROJECT_CODE_ACTION,
      type: 'custom',
      addable: false,
      editable: false,
      renderComponent: ConfigureWebComponent,
      filter: false,
      onComponentInitFunction(instance) {
        instance.refresh.subscribe(() => {
          that.loadWebApps();
        });
      },
    };
    this.settings = {
      selectMode: 'multi',
      mode: 'external',
      actions: false,
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      columns: {
        url: {
          title: this.constants.PROJECT_WEBAPP_URL,
          type: 'string',
        },
        routingDomain: {
          title: this.constants.PROJECT_WEBAPP_ROUTINGDOMAIN,
          valuePrepareFunction: (cell, row) => {
            return (row.routingDomain ? row.routingDomain.name : 'no domain');
          },
          type: 'string',
        },
        risk: {
          title: this.constants.PROJECT_WEBAPP_RISK,
          type: 'custom',
          sortDirection: 'desc',
          addable: false,
          editable: false,
          renderComponent: MixerProgresComponent,
          filter: false,
        },
        action: this.canEdit ? actions : {class: 'd-none', editable: false, filter: false},
      },
    };
  }
  saveWebApp(webApp, ref) {
    if (this.webAppForm.valid) {
      alert(JSON.stringify(this.webAppForm.value));
      this.webAppForm.value.scanPublic = parseInt(this.webAppForm.value.scanPublic, 10) === 1;
      return this.showProjectService.saveWebApp(this._entityId, this.webAppForm.value).subscribe(() => {
          this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
            this.constants.PROJECT_WEBAPP_SAVE);
          this.loadWebApps();
          ref.close();
        },
        (error) => {
          if (error === '409') {
            this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
              this.constants.PROJECT_OPERATION_FAILURES_DUPLICATE);
          } else {
            this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
              this.constants.PROJECT_OPERATION_FAILURES_EXTENDED);
          }
        });
    } else {
      this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
        this.constants.PROJECT_OPERATION_FAILURES_EXTENDED);
    }
  }
  onAssetSelect(event) {
    this.selectedRows = event.selected;
  }
  refresh() {
    this.loadWebApps();
  }
  enableAutoScan() {
    return this.showProjectService.enableWebAppAutoScan(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_INFRA_AUTO_SCAN);
        this.loadWebApps();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
  runAllScan() {
    return this.showProjectService.runWebAppScanForAll(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_INFRA_SCAN_STARTED);
        this.loadWebApps();

      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
  startSelectedScan() {
    return this.showProjectService.runWebAppScanForSelected(this._entityId, this.selectedRows).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_INFRA_SCAN_STARTED);
        this.loadWebApps();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }

  disableAutoScan() {
    return this.showProjectService.disableWebAppAutoScan(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_WEBAPP_AUTO_DISABLE);
        this.loadWebApps();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }

  toggleHeader(checked: boolean) {
    this.showHeaders = checked;
  }
  togglePassword(checked: any) {
    this.showPasswords = checked;
  }
}
