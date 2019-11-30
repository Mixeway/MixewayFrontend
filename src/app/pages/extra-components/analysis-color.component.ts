import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <span [class]="'badge ' + class">{{ rowData.analysis }}</span>
  `,
})
export class AnalysisColorComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  class: string;
  ngOnInit(): void {
    if (this.rowData.analysis === 'Exploitable' ) {
      this.class = 'badge-danger';
    } else if (this.rowData.severity === 'Suspicious') {
      this.class = 'badge-warning';
    } else if (this.rowData.severity === 'Not an Issue') {
      this.class = 'badge-success';
    } else {
      this.class = 'badge-info';
    }
  }
}
