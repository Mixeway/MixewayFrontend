import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
      <nb-icon icon="more-horizontal-outline" nbTooltip="Read more..." [options]="{ animation: { type: 'zoom' } }" style="display: block; margin-left: auto; margin-right: auto;"></nb-icon>
  `,
})
export class DetailsComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  ngOnInit(): void {
  }
}
