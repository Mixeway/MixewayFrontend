import {Component, OnInit} from '@angular/core';
import {Risk} from '../../@core/Model/Risk';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ProjectConstants} from '../../@core/constants/ProjectConstants';
import {ScannerType} from '../../@core/Model/Scanner';
import {CiOperations} from '../../@core/Model/CiOperations';

@Component({
  selector: 'ngx-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.scss'],
})
export class ShowProjectComponent implements OnInit {
  risk: Risk;
  infraRiskCard: any;
  codeRiskCard: any;
  webAppRiskCard: any;
  auditRiskCard: any;
  openSourceCard: any;
  _entityId: any;
  ciOperations: CiOperations[];
  scannerTypes: ScannerType[];
  showConfigTemplate: boolean;
  showConfigTableTemplate: boolean = false;
  showDetailsTemplate: boolean;
  role: string;
  constants: ProjectConstants = new ProjectConstants();
  constructor(private showProjectService: ShowProjectService, private _route: ActivatedRoute, private router: Router,
              private cookieService: CookieService) {
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }
    this.drawRiskCards(this._entityId);
    this.loadScannerTypes();
    this.loadCiOperations();
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
}
