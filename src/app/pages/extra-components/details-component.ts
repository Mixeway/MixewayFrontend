import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NbWindowService} from '@nebular/theme';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {Vulnerability} from '../../@core/Model/Vulnerability';

@Component({
  template: `
    <ng-template #vulnerability style="display: flex;flex-direction: column;">
      <div class="modal-body px-0">
        <div style="overflow-y: hidden; height: calc(100vh - 15rem);">
          <div class="px-2" style="overflow-y: auto; height: 100%;">
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
            <div class="row">
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
            <div class="row">
              <div class="col-md-12">
                <nb-card>
                  <nb-card-header>
                    References
                  </nb-card-header>
                  <nb-card-body>
                    {{ references }}
                  </nb-card-body>
                </nb-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>

    <nb-icon (click)="openWindowWithBackdrop()" icon="more-horizontal-outline" nbTooltip="Read more..." [options]="{ animation: { type: 'zoom' } }" style="display: block; margin-left: auto; margin-right: auto;"></nb-icon>
  `,
})
export class DetailsComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  @ViewChild('vulnerability', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;
  vulnerability: Vulnerability;
  location: string;
  inserted: string;
  description: string;
  recommendation: string;
  asset: string;
  references: string;
  constructor(private windowService: NbWindowService, private showProjectService: ShowProjectService) {

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
      }
      this.references = data.vulnerability.refs;
      this.description = data.description;
      this.recommendation = data.vulnerability.recommendation;
      this.windowService.open(
        this.escCloseTemplate,
        { title: this.vulnerability.vulnerability.name, hasBackdrop: true },
      );
    });
  }
  ngOnInit(): void {
  }

  openWindowWithBackdrop() {
    this.loadVulnerability();
  }
}
