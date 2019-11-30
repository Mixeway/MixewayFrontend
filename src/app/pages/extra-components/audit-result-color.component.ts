import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <span align="center" [class]="'badge ' + class">{{ rowData.score }}</span>
  `,
})
export class AuditResultColorComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  class: string;
  ngOnInit(): void {
    if (this.rowData.score === 'PASS' ) {
      this.class = 'badge-success';
    } else if (this.rowData.score === 'WARN') {
      this.class = 'badge-warning';
    } else {
      this.class = 'badge-danger';
    }
  }
}
