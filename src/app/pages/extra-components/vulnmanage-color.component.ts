import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <span [class]="'badge ' + class">{{ text }}</span>
  `,
})
export class VulnmanageColorComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  class: string;
  text: string;
  ngOnInit(): void {
    if (this.rowData.enableVulnManage === 0 ) {
      this.class = 'badge-danger';
      this.text = 'Disabled';
    } else if (this.rowData.enableVulnManage === 1) {
      this.class = 'badge-success';
      this.text = 'Enabled';
    } else {
      this.class = 'badge-info';
      this.text = 'Unknown';
    }
  }
}
