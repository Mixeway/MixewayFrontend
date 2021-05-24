import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NbWindowService} from '@nebular/theme';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {Vulnerability} from '../../@core/Model/Vulnerability';
import {Toast} from '../../@core/utils/Toast';

@Component({
  template: `
    <ng-template #vulnerability style="display: flex;flex-direction: column;">
      <div class="modal-body px-0">
        <div style="overflow-y: hidden; height: calc(100vh - 15rem);">
          <div class="px-2" style="overflow-y: auto; height: 100%;">
            <div class="row" *ngIf="grade === 1">
              <div class="col-md-12">
                <nb-alert status="danger" nbTooltip="Vulnerability
can be marked by Mixeway Vuln Auditor or manualy by a user, read docs to get more informations.">This vulnerability is marked as confirmed and important. </nb-alert>
              </div>
            </div>
            <div class="row" *ngIf="grade === 0">
              <div class="col-md-12">
                <nb-alert status="success" nbTooltip="Vulnerability
can be marked by Mixeway Vuln Auditor or manualy by a user, read docs to get more informations.">This vulnerability is marked as not confirmed or not relavant in given context. </nb-alert>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <nb-card>
                  <nb-card-header>
                    Asset Affected
                  </nb-card-header>
                  <nb-card-body>
                    {{ asset }}
                  </nb-card-body>
                </nb-card>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <nb-card>
                  <nb-card-header>
                    Vulnerability location
                  </nb-card-header>
                  <nb-card-body>
                    {{ location }}
                  </nb-card-body>
                </nb-card>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <nb-card>
                  <nb-card-header>
                    Vulnerability Description
                  </nb-card-header>
                  <nb-card-body [innerHTML]="description" style="white-space: pre-wrap;">
                  </nb-card-body>
                </nb-card>
              </div>
            </div>
            <div class="row" *ngIf="recommendation">
              <div class="col-md-12">
                <nb-card>
                  <nb-card-header>
                    Vulnerability Recommendation
                  </nb-card-header>
                  <nb-card-body [innerHTML]="recommendation" style="white-space: pre-wrap;">
                  </nb-card-body>
                </nb-card>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <nb-card>
                  <nb-card-header>
                    Last seen
                  </nb-card-header>
                  <nb-card-body>
                    {{ inserted }}
                  </nb-card-body>
                </nb-card>
              </div>
            </div>
            <div class="row" *ngIf="references">
              <div class="col-md-12">
                <nb-card>
                  <nb-card-header>
                    References
                  </nb-card-header>
                  <nb-card-body [innerHTML]="references" style="white-space: pre-wrap;">
                  </nb-card-body>
                </nb-card>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <nb-card>
                  <nb-card-header>
                    Manually set the grade for given vulnerability
                  </nb-card-header>
                  <nb-card-body>
                    <button style="float:right" nbButton outline status="success" [disabled]="grade==0" (click)="setGradeForVuln(0)">Mark as not relevant</button>
                    <button style="float:left" nbButton outline status="danger" [disabled]="grade==1" (click)="setGradeForVuln(1)">Mark as confirmed and relevant</button>
                  </nb-card-body>
                </nb-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>

    <button nbButton nbTooltip="Read more..." (click)="openWindowWithBackdrop()" ><nb-icon icon="more-horizontal-outline"
                                            [options]="{ animation: { type: 'zoom' } }" style="display: block; margin-left: auto; margin-right: auto;"></nb-icon></button>
  `,
})
export class DetailsComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  @ViewChild('vulnerability', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  vulnerability: Vulnerability;
  location: string;
  inserted: string;
  description: string;
  recommendation: string;
  asset: string;
  references: string;
  grade: number;
  bugTrackerEnabled: boolean;
  constructor(private windowService: NbWindowService, private showProjectService: ShowProjectService,
              private toast: Toast) {
  }

  loadVulnerability() {
    return this.showProjectService.getVulnerability(this.rowData.projectId, this.rowData.id).subscribe(data => {
      this.vulnerability = data;
      this.location = data.location;
      this.inserted = data.inserted;
      if (data.vulnerabilitySource.name === 'Network') {
        this.asset = data.anInterface.asset.name + ' / ' + data.anInterface.privateip;
      } else if (data.vulnerabilitySource.name === 'SourceCode') {
        this.asset = data.codeProject.codeGroup.name + ' / ' + data.codeProject.name;
      } else if (data.vulnerabilitySource.name === 'WebApplication') {
        this.asset = data.webApp.url;
      } else if (data.vulnerabilitySource.name === 'OpenSource') {
        this.asset = data.codeProject.codeGroup.name + ' / ' + data.codeProject.name;
      } else if (data.vulnerabilitySource.name === 'CISBenchmark') {
        this.asset = data.location;
      }
      this.references = data.vulnerability ? data.vulnerability.refs : '';
      this.description = data.description;
      this.recommendation = data.vulnerability ? data.vulnerability.recommendation : '';
      this.grade = data.grade;
      this.windowService.open(
        this.escCloseTemplate,
        { title: this.vulnerability.vulnerability ? this.vulnerability.vulnerability.name :
            this.vulnerability.cisRequirement.name, hasBackdrop: true },
      );
    });
  }
  ngOnInit(): void {
  }

  openWindowWithBackdrop() {
    this.loadVulnerability();
  }

  setGradeForVuln(number: number) {
    return this.showProjectService.setGradeForVuln(this.rowData.projectId, this.rowData.id, number).subscribe(() => {
        this.toast.showToast('primary', 'Success',
          'Vulnerability classification has been changed.');
        this.grade = number;
        this.rowData.grade = number;
        this.refresh.emit(this.rowData);
        this.loadVulnerability();
      },
      () => {
        this.toast.showToast('danger', 'Failure', 'There was a problem while changing vulnerability classification');
      });
  }
}
