import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <span [class]="'badge ' + class" style="display: block; margin-left: auto; margin-right: auto;">{{ severity }}</span>
  `,
})
export class AlertColorComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  severity: string;
  class: string;
  ngOnInit(): void {
    if (this.rowData.hasOwnProperty('severity')) {
      this.severity = this.rowData.severity;
    } else if ( this.rowData.hasOwnProperty('softwarePacketVulnerability') ) {
      this.severity = this.rowData.softwarePacketVulnerability.severity;
    } else if (this.rowData.hasOwnProperty('threat')) {
      this.severity = this.rowData.threat;
    }
    if (this.severity.toLowerCase() === 'Critical' || this.severity.toLowerCase() === 'High' ) {
      this.class = 'badge-danger';
    } else if (this.severity.toLowerCase() === 'Medium' ) {
      this.class = 'badge-warning';
    } else {
      this.class = 'badge-info';
    }
    if (this.rowData.analysis) {
      this.severity += ' / ' + this.rowData.analysis;
      if (this.rowData.analysis === 'Not an Issue') {
        this.class = 'badge-success';
      }
    }
  }
}
