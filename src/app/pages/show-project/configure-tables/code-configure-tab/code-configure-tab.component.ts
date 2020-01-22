import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {MixerProgresComponent} from '../../../extra-components/mixer-progres/mixer-progres.component';
import {ShowProjectService} from '../../../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {CodeGroup, Codes} from '../../../../@core/Model/Codes';
import {FormBuilder, Validators} from '@angular/forms';
import {Toast} from '../../../../@core/utils/Toast';
import {ConfigureCodeComponent} from '../../../extra-components/configure-code/configure-code.component';
import {ProjectConstants} from '../../../../@core/constants/ProjectConstants';

@Component({
  selector: 'ngx-code-configure-tab',
  templateUrl: './code-configure-tab.component.html',
  styleUrls: ['./code-configure-tab.component.scss'],
})
export class CodeConfigureTabComponent implements OnInit {
  settings: any;
  codeAutomaticScanButton: boolean;
  codeScanRunSelectedButton: boolean = true;
  role: any;
  _entityId: number;
  codes: Codes;
  codeGroups: CodeGroup[] = [];
  codeGroupForm;
  codeProjectForm;
  selectedRows;
  canEdit: boolean;
  loading: boolean = true;
  numberOfRunningTest: number = 0;
  canScanAll: boolean = false;
  constants: ProjectConstants = new ProjectConstants();
  constructor(private dialogService: NbDialogService,
              private showProjectService: ShowProjectService, private _route: ActivatedRoute, private router: Router,
              private cookieService: CookieService, private formBuilder: FormBuilder, private toast: Toast ) {
    this.role = this.cookieService.get('role');
    this.canEdit = (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_EDITOR_RUNNER');
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }
    this.loadSettingsTable();
    this.loadCodes();
    this.loadCodeGroups();
    this.codeProjectForm = this.formBuilder.group({
      codeGroup: [0, Validators.min(0)],
      codeProjectName: ['', Validators.required],
      projectGiturl: ['', [Validators.required, Validators.pattern('(https?:\\/\\/(?:www\\.' +
        '|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+' +
        '[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]' +
        '{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})')]],
      projectTech: ['', Validators.required],
      projectBranch: '',
      dTrackUuid: '',
      additionalPath: '',
    });
    this.codeGroupForm = this.formBuilder.group({
      codeGroupName: ['', Validators.required],
      versionIdAll: [0, Validators.required],
      versionIdSingle: 0,
      giturl: ['', [Validators.pattern('(https?:\\/\\/(?:www\\.' +
        '|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+' +
        '[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]' +
        '{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})')]],
      gitusername: '',
      dTrackUuid: '',
      gitpassword: '',
      tech: '',
      autoScan: false,
      childs: false,
    });
  }
  loadCodes() {
    return this.showProjectService.getCodes(this._entityId).subscribe(data => {
      this.codes = data;
      this.codeAutomaticScanButton = this.codes.codeAutoScan;
      this.numberOfRunningTest = this.codes.codeModels.filter(a => a.running === true).length;
      this.canScanAll = this.numberOfRunningTest === 0;
      this.loading = false;
    });
  }
  loadCodeGroups() {
    return this.showProjectService.getCodeGroups(this._entityId).subscribe(data => {
      this.codeGroups = data;
    });
  }

  runTestSingle(event) {
    window.confirm('running ' + event.data.ipAddress);
  }
  openCreateApiDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  ngOnInit() {
  }
  loadSettingsTable() {
    const that = this;
    const actions: any = {
      title: this.constants.PROJECT_CODE_ACTION,
      type: 'custom',
      addable: false,
      editable: false,
      renderComponent: ConfigureCodeComponent,
      filter: false,
      onComponentInitFunction(instance) {
        instance.refresh.subscribe(() => {
          that.loadCodes();
        });
      },
    };
    this.settings = {
      selectMode: 'multi',
      mode: 'external',
      actions: false,
      columns: {
        codeGroup: {
          title: this.constants.PROJECT_CODE_GROUP,
          type: 'string',
        },
        codeProject: {
          title: this.constants.PROJECT_CODE_PROJECT,
          type: 'boolean',
        },
        risk: {
          title: this.constants.PROJECT_CODE_RISK,
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
  saveCodeGroup(codeGroup, ref) {
    if (this.codeGroupForm.valid) {
      return this.showProjectService.saveCodeGroup(this._entityId, this.codeGroupForm.value).subscribe(() => {
          this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
            this.constants.PROJECT_OPERATION_GROUP_SAVE_SUCCESS);
          this.loadCodeGroups();
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
  saveCodeProject(codeProject, ref) {
    if (this.codeProjectForm.valid) {
      return this.showProjectService.saveCodeProject(this._entityId, this.codeProjectForm.value).subscribe(() => {
          this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
            this.constants.PROJECT_OPERATION_PROJECT_SAVE_SUCCESS);
          this.loadCodes();
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
  onAssetSelect(event) {
    this.selectedRows = event.selected;
  }
  startSelectedAssets() {
    return this.showProjectService.runCodeScanForSelected(this._entityId, this.selectedRows).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATION_RUNSCAN_SUCCESS);
        this.loadCodes();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES_EXTENDED);
      });
  }
  refresh() {
    this.loadCodes();
  }
  enableAutoScan() {
    return this.showProjectService.enableCodeAutoScan(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATION_RUNSCAN_AUTO_SUCCESS);
        this.loadCodes();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES_EXTENDED);
      });
  }

  disableAutoScan() {
    return this.showProjectService.disableCodeAutoScan(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATION_RUNSCAN_AUTO_DISABLE_SUCCESS);
        this.loadCodes();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES_EXTENDED);
      });
  }
}
