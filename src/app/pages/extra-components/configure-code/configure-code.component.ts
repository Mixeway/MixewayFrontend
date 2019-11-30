import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {Toast} from '../../../@core/utils/Toast';
import {ExtraConstants} from '../../../@core/constants/ExtraConstants';

@Component({
  selector: 'ngx-configure-code',
  templateUrl: './configure-code.component.html',
  styleUrls: ['./configure-code.component.scss'],
})
export class ConfigureCodeComponent implements OnInit {
  @Input() rowData: any;
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  constants: ExtraConstants = new ExtraConstants();
  constructor(private showProjectService: ShowProjectService, private toast: Toast) {
  }

  ngOnInit() {
  }
  playOnceScan() {
    return this.showProjectService.runCodeScanForSingle(this.rowData.id).subscribe(() => {
        this.toast.showToast('success', this.constants.SUCCESS,
          this.constants.OPERATION_RUNONCE);
          this.rowData.running = true;
        this.refresh.emit(null);
      },
      () => {
        this.toast.showToast('danger', this.constants.FAILURE,
          this.constants.FAILURE_TEXT);
      });
  }
  deleteWebApp() {
    return this.showProjectService.deleteCodeProject(this.rowData.id).subscribe(() => {
        this.toast.showToast('success', this.constants.SUCCESS,
          this.constants.CODE_OPERATION_CODE_DELETE);
        this.refresh.emit(null);
      },
      () => {
        this.toast.showToast('danger', this.constants.FAILURE,
          this.constants.FAILURE_TEXT);
      });
  }

}
