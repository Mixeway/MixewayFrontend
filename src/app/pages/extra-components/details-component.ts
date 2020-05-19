import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NbWindowService} from '@nebular/theme';
import {ShowProjectService} from '../../@core/service/ShowProjectService';
import {Vulnerability} from '../../@core/Model/Vulnerability';

@Component({
  template: `
    <ng-template #vulnerability>
      <div class="row">
        <div class="col-md-8">
          <nb-card>
            <nb-card-header>
              Affected
            </nb-card-header>
            <nb-card-body>
              {{ location }}
            </nb-card-body>
          </nb-card>
        </div>
        <div class="col-md-4">
          <nb-card>
            <nb-card-header>
              Discovered (last)
            </nb-card-header>
            <nb-card-body>
              {{ inserted }}
            </nb-card-body>
          </nb-card>
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
  constructor(private windowService: NbWindowService, private showProjectService: ShowProjectService) {

  }
  loadVulnerability() {
    return this.showProjectService.getVulnerability(this.rowData.projectId, this.rowData.id).subscribe(data => {
      this.vulnerability = data;
      this.location = data.location;
      this.inserted = data.inserted;
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
