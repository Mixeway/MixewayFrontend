import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
      <ng-template #card>
          <nb-card class="popover-card" style="white-space: pre-wrap">
              <nb-card-header status="warning">
                  {{(rowData.webApp ? rowData.webApp.url + '\\n' + rowData.name : rowData.name) }}
              </nb-card-header>
              <nb-card-body>
                  {{rowData.description? rowData.description : rowData.softwarePacketVulnerability.description}}
              </nb-card-body>
          </nb-card>
      </ng-template>
    <img style="display: block;margin-left: auto;margin-right: auto;height: 40px;"
         [src]="'../../../assets/images/' + (rowData.status? rowData.status.name.toLowerCase() : 'existing' ) +'.png'"
         [nbPopover]="card">
  `,
})
export class NewIconComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  ngOnInit(): void {
  }
}
