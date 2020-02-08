import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <img [src]="'../../../assets/images/' + image" width="40%" style="position: absolute; right: 0; left: 0; top: 0; bottom: 0; margin: auto auto;">
  `,
})
export class OsScanIntegrationIconComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  image: string;
  ngOnInit(): void {
    if (this.rowData.dTrackUuid) {
      this.image = 'ok.png';
    } else {
      this.image = 'notok.png';
    }
  }
}
