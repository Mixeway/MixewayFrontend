import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <img [src]="'../../../assets/images/' + rowData.status +'.png'">
  `,
})
export class DescriptionToggleComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  ngOnInit(): void {
  }
}
