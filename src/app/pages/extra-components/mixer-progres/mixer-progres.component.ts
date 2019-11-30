import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-mixerprogress-bar',
  templateUrl: 'mixer-progres.component.html',
  styleUrls: ['mixer-progres.component.scss'],
})
export class MixerProgresComponent implements OnInit {
  @Input() rowData: any;

  class: string;

  ngOnInit() {
    if (this.rowData) {
      if (+this.rowData.risk < 30) {
        this.class = 'success';
      } else if (+this.rowData.risk < 75) {
        this.class = 'warning';
      } else {
        this.class = 'danger';
      }
    }
  }
}
