import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Risk} from '../../@core/Model/Risk';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ProjectConstants} from '../../@core/constants/ProjectConstants';
import {ScannerType} from '../../@core/Model/Scanner';
import {CiOperations} from '../../@core/Model/CiOperations';
import {NbDialogService, NbWindowService} from '@nebular/theme';
import {FormBuilder} from '@angular/forms';
import {Toast} from '../../@core/utils/Toast';
import {ProjectInfo} from '../../@core/Model/ProjectInfo';
import {Template} from '@angular/compiler/src/render3/r3_ast';
import {VulnTrendChart} from '../../@core/Model/VulnTrendChart';
import {Severities} from '../../@core/Model/Severities';
import {ProjectStats} from '../../@core/Model/ProjectStats';

@Component({
  selector: 'ngx-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.scss'],
})
export class ShowProjectComponent implements OnInit {
  @ViewChild('vulnAuditorSettings')
  showVulnAuditorDialog: TemplateRef<any>;
  risk: Risk;
  infraRiskCard: any;
  codeRiskCard: any;
  webAppRiskCard: any;
  auditRiskCard: any;
  openSourceCard: any;
  projectInfo: ProjectInfo = new ProjectInfo;
  _entityId: any;
  ciOperations: CiOperations[];
  scannerTypes: ScannerType[];
  showConfigTemplate: boolean;
  showVulnAuditor: boolean;
  showConfigTableTemplate: boolean = false;
  showDetailsTemplate: boolean;
  role: string;
  constants: ProjectConstants = new ProjectConstants();
  vulnTrendChart: VulnTrendChart;
  @ViewChild('showInstructions') showInstructions: TemplateRef<any>;
  hostname: string;
  severities: Severities;
  severitiesChartData: any = [];
  projectStats: ProjectStats;
  private vulnAuditorForm: any;
  constructor(private showProjectService: ShowProjectService, private _route: ActivatedRoute, private router: Router,
              private cookieService: CookieService, private dialogService: NbDialogService,
              private formBuilder: FormBuilder, private toast: Toast, private windowService: NbWindowService) {
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }
    this.drawRiskCards(this._entityId);
    this.loadScannerTypes();
    this.loadProjectInfo();
    this.loadCiOperations();
    this.loadTrendChartData();
    this.loadSeveritiesChart();
    this.loadProjectStats();
    this.vulnAuditorForm = this.formBuilder.group({
      enableVulnAuditor: this.projectInfo.vulnAuditorEnable,
      dclocation: this.projectInfo.networkdc,
      appClient: this.projectInfo.appClient,
    });
    this.updateShowDockerInfo();
  }
  loadTrendChartData() {
    return this.showProjectService.getVulnTrendChart(this._entityId).subscribe(data => {
      this.vulnTrendChart = data;
    });
  }
  loadSeveritiesChart() {
    return this.showProjectService.getSeverityChart(this._entityId).subscribe(data => {
      this.severities = data;
      this.severitiesChartData.push({value: data.Low, name: 'Low'});
      this.severitiesChartData.push({value: data.High, name: 'High'});
      this.severitiesChartData.push({value: data.Critical, name: 'Critical'});
      this.severitiesChartData.push({value: data.Medium, name: 'Medium'});
    });
  }
  updateShowDockerInfo() {
    const url = window.location.href;
    const arr = url.split('/');
    this.hostname = arr[0] + '//' + arr[2];

  }

  loadProjectInfo() {
    return this.showProjectService.getProjectInfo(this._entityId).subscribe(data => {
      this.projectInfo = data;
      this.vulnAuditorForm.patchValue({
        enableVulnAuditor: data.vulnAuditorEnable,
        dclocation: data.networkdc,
        appClient: data.appClient,
      });
    });
  }
  loadProjectStats() {
    return this.showProjectService.getProjectStats(this._entityId).subscribe(data => {
      this.projectStats = data;
    });
  }
  drawRiskCards(id) {
    return this.showProjectService.getRiskCards(id).subscribe(data => {
      this.risk = data;
      this.infraRiskCard = this.riskCardBuilder(this.constants.PROJECT_CARD_INFRAP_TITLE,
        this.constants.PROJECT_CARD_INFRAP_TEXT,
        this.risk.assetNumber, this.risk.assetRisk);
      this.webAppRiskCard = this.riskCardBuilder(this.constants.PROJECT_CARD_WEBAPP_TITLE,
        this.constants.PROJECT_CARD_WEBAPP_TEXT,
        this.risk.webAppNumber, this.risk.webAppRisk);
      this.codeRiskCard = this.riskCardBuilder(this.constants.PROJECT_CARD_CODE_TITLE,
        this.constants.PROJECT_CARD_CODE_TEXT,
        this.risk.codeRepoNumber, this.risk.codeRisk);
      this.auditRiskCard = this.riskCardBuilder(this.constants.PROJECT_CARD_AUDIT_TITLE,
        this.constants.PROJECT_CARD_AUDIT_TEXT,
        this.risk.audit, this.risk.auditRisk);
      this.openSourceCard = this.riskCardBuilder(this.constants.PROJECT_CARD_OPENSOURCE_TITLE,
          this.constants.PROJECT_CARD_OPENSOURCE_TEXT,
          this.risk.openSourceLibs, this.risk.openSourceRisk);
      if (this.risk?.webAppNumber === 0 &&
        this.risk?.codeRepoNumber === 0 &&
        this.risk?.assetNumber === 0 &&
        this.risk?.audit === 0) {
          // this.windowService.open(
          //   this.showInstructions,
          //   { title: 'First step instruction', context: { text: 'some text to pass into template' } },
          // );
      }
    });
  }

  loadScannerTypes() {
    return this.showProjectService.getPossibleScanners().subscribe(data => {
      this.scannerTypes = data;
    });
  }
  loadCiOperations() {
    return this.showProjectService.getCiForProject(this._entityId).subscribe(data => {
      this.ciOperations = data.sort((a, b) => a.id > b.id ? -1 : a.id < b.id ? 1 : 0);

    });
  }
  ngOnInit() {
    this.role = this.cookieService.get('role');
    this.showConfigTemplate = this.role !== 'ROLE_ADMIN' && this.role !== 'ROLE_EDITOR_RUNNER';
    this.showVulnAuditor = true;
    this.showDetailsTemplate = true;
  }

  showConfig() {
    this.showConfigTableTemplate = true;
    this.showConfigTemplate = true;
    this.showDetailsTemplate = false;
  }
  showDetails() {
    this.showConfigTableTemplate = false;
    this.showDetailsTemplate = true;
    this.showConfigTemplate = false;
  }
  riskCardBuilder (name, inventoryName, inventoryCount, risk) {
    return {
      name: name,
      inventoryName: inventoryName,
      inventoryCount: inventoryCount,
      risk: risk,
    };
  }

  displayProjectGlobalSettings() {
    this.openCreateApiDialog(this.showVulnAuditorDialog);
  }
  openCreateApiDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  saveVulnAuditorSettings(ref) {
    return this.showProjectService.saveVulnAuditorSettings(this._entityId, this.vulnAuditorForm.value).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          'Vuln Auditor Settings saved successfully.');
        this.loadProjectInfo();
        ref.close();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
}
