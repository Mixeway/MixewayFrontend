import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {MixerProgresComponent} from '../../../extra-components/mixer-progres/mixer-progres.component';
import {RoutingDomain} from '../../../../@core/Model/RoutingDomain';
import {IaasApi} from '../../../../@core/Model/IaasApi';
import {ShowProjectService} from '../../../../@core/service/ShowProjectService';
import {Assets} from '../../../../@core/Model/Asset';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ConfigureInfraComponent} from '../../../extra-components/configure-infra/configure-infra.component';
import {FormBuilder, Validators} from '@angular/forms';
import {Toast} from '../../../../@core/utils/Toast';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {ProjectConstants} from '../../../../@core/constants/ProjectConstants';
import {ScannerType} from '../../../../@core/Model/Scanner';


@Component({
  selector: 'ngx-infra-configure-tab',
  templateUrl: './infra-configure-tab.component.html',
  styleUrls: ['./infra-configure-tab.component.scss'],
})
export class InfraConfigureTabComponent implements OnInit {
  // @ts-ignore
  @ViewChild('addAsset')
  addDialog: TemplateRef<any>;
  // @ts-ignore
  @Input() scannerTypes: ScannerType[];
  iaasDialog: TemplateRef<any>;
  settings: any;
  infraScanRunSelectedButton: boolean = false;
  iaasApiAdd: boolean = false;
  @Input() routingDomains: RoutingDomain[];
  _entityId: number;
  iaasApis: IaasApi;
  assets: Assets;
  canScanAll: boolean;
  role: any;
  canEdit: boolean = false;
  iaasApiForm;
  assetForm;
  selectedRows;
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
    this.setTableSettings();
    this.loadAssets();
    this.loadIaasApi();
    this.iaasApiForm = this.formBuilder.group({
      iamApi: ['', [Validators.required, Validators.pattern('(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+' +
        '[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]' +
        '{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})')]],
      serviceApi: ['', [Validators.required, Validators.pattern('(https?:\\/\\/(?:www\\.|(?!www))' +
        '[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]' +
        '{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})')]],
      networkApi: ['', [Validators.required, Validators.pattern('(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]' +
        '[a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]' +
        '{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})')]],
      projectid: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      routingDomainForIaasApi: 0,
    });
    this.assetForm = this.formBuilder.group({
      assetName: ['', Validators.required],
      ipAddresses: ['', Validators.required],
      routingDomainForAsset: 0,
    });
  }



  loadIaasApi() {
    return this.showProjectService.getIaasApi(this._entityId).subscribe(data => {
      this.iaasApis = data;
      this.iaasApiAdd = !!this.iaasApis.iam;
    });
  }

  loadAssets() {
    return this.showProjectService.getAssets(this._entityId).subscribe(data => {
      this.assets = data;
      this.numberOfRunningTest = this.assets.assets.filter(a => a.running === true).length;
      this.canScanAll = this.numberOfRunningTest === 0;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.setTableSettings();
  }

  onAdd() {
    this.openCreateApiDialog(this.addDialog);
  }

  runTestSingle(event) {
    window.confirm('running ' + event.data.ipAddress);
  }
  openCreateApiDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'this is some additional data passed to dialog'});
  }

  setTableSettings() {
    const that = this;
    const actions: any = {
      title: this.constants.PROJECT_CODE_ACTION,
      type: 'custom',
      addable: false,
      editable: false,
      renderComponent: ConfigureInfraComponent,
      filter: false,
      onComponentInitFunction(instance) {
        instance.refresh.subscribe(() => {
          that.loadAssets();
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
        hostname: {
          title: this.constants.PROJECT_INFRA_TABLE_ASSET,
          type: 'string',
        },
        ipAddress: {
          title: this.constants.PROJECT_INFRA_TABLE_ASSET_IP,
          type: 'string',
        },
        routingDomain: {
          title: this.constants.PROJECT_INFRA_TABLE_ROUTINGDOMAIN,
          type: 'string',
        },
        risk: {
          title: this.constants.PROJECT_INFRA_TABLE_RISK,
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

  iaasApiSubmit(ref) {
    if (this.iaasApiForm.valid) {
      return this.showProjectService.putIaasForProject(this._entityId, this.iaasApiForm.value).subscribe(() => {
          this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
            this.constants.PROJECT_OPERATIONS_IAAS_SAVE_SUCCESS);
          this.loadIaasApi();
          ref.close();
        },
        () => {
          this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
            this.constants.PROJECT_OPERATION_FAILURES_EXTENDED);
      });
    } else {
      this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
        this.constants.PROJECT_OPERATION_FAILURES_EXTENDED);
    }
  }
  testIaasApi() {
    return this.showProjectService.testIaasApi(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_IAAS_TEST_SUCCESS);
        this.loadIaasApi();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATIONS_IAAS_TEST_FAIL);
      });
  }
  enableIaasApi() {
    return this.showProjectService.enableIaasSynchro(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_IAAS_SYNCHRO_ENABLE);
        this.loadIaasApi();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
  disableIaasApi() {
    return this.showProjectService.disableIaasSynchro(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_IAAS_SYNCHRO_DISABLE);
        this.loadIaasApi();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
  deleteIaasApi() {
    return this.showProjectService.deleteIaas(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_IAAS_DELETE);
        this.loadIaasApi();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
  saveAsset(assetForm, ref) {
    return this.showProjectService.saveAsset(this._entityId, assetForm).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_ASSET_SAVE);
        this.loadAssets();
        ref.close();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES_EXTENDED);
      });
  }

  enableAutoScan() {
    return this.showProjectService.enableInfraAutoScan(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_INFRA_AUTO_SCAN);
        this.loadAssets();

      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
  runAllScan() {
    return this.showProjectService.runInfraScanForAll(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_INFRA_SCAN_STARTED);
        this.loadAssets();

      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
  onAssetSelect(event) {
    this.selectedRows = event.selected;
    this.infraScanRunSelectedButton = this.selectedRows.length > 0;
  }
  startSelectedAssets() {
    return this.showProjectService.runInfraScanForSelected(this._entityId, this.selectedRows
      .filter(i => i.running === false)).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_INFRA_SCAN_STARTED);
        this.loadAssets();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
  refresh() {
    this.loadAssets();
  }
  downloadCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: [
        'hostname',
        'ip',
        'routingdomain',
      ],
    };
      new Angular5Csv(this.getExportedValuesForInfra(), 'report', options);
  }
  getExportedValuesForInfra() {
    const data = [];
    for (const row of this.assets.assets) {
      data.push({
        hostname: row.hostname,
        ip: row.ipAddress,
        domain: row.routingDomain,
      });
    }
    return data;
  }

  disableAutoScan() {
    return this.showProjectService.disableInfraAutoScan(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATIONS_DISABLE_AUTO);
        this.loadAssets();

      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
}
