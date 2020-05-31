import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <img style="display: block;margin-left: auto;margin-right: auto;height: 40px;"
         [src]="'../../../assets/images/' + (rowData.status? rowData.status.toLowerCase() : 'existing' ) +'.png'">
  `,
})
export class StatusComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  ngOnInit(): void {
  }
}
