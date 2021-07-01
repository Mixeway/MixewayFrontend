import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    {{ location }} <nb-icon *ngIf="tooltip" icon="info-outline" pack="eva" [options]="{ animation: { type: 'pulse' } }"
                            nbTooltip="{{locationDetails}}"
                            nbTooltipPlacement="top"
                            nbTooltipStatus="info"></nb-icon>
  `,
})
export class VulnLocationComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  location: String = '';
  locationDetails: String;
  tooltip: boolean = false;
  ngOnInit(): void {
    if ( this.rowData.source === 'OpenSource') {
      this.location = this.rowData.codeProject;
      this.locationDetails = 'File: ' + this.rowData.location;
      this.tooltip = true;
    } else if ( this.rowData.source === 'SourceCode') {
      this.location = this.rowData.codeProject;
      this.locationDetails = 'File: ' + this.rowData.location;
      this.tooltip = true;
    } else {
      this.location = this.rowData.location;
    }
  }
}
