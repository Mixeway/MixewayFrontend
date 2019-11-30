import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <span align="center" [class]="'badge ' + class">{{ rowData.result }}</span>
  `,
})
export class CiresultColorComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  class: string;
  ngOnInit(): void {
    if (this.rowData.result === 'Ok' ) {
      this.class = 'badge-success';
    }  else {
      this.class = 'badge-danger';
    }
  }
}
