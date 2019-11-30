import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {Toast} from '../../../@core/utils/Toast';
import {ExtraConstants} from '../../../@core/constants/ExtraConstants';

@Component({
  selector: 'ngx-configure-infra',
  templateUrl: './configure-infra.component.html',
  styleUrls: ['./configure-infra.component.scss'],
})
export class ConfigureInfraComponent implements OnInit {
  @Input() rowData: any;
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  constants: ExtraConstants = new ExtraConstants();
  constructor(private showProjectService: ShowProjectService, private toast: Toast) {
  }

  ngOnInit() {
  }
  playOnceScan() {
    return this.showProjectService.runInfraScanForSingle(this.rowData.assetId).subscribe(() => {
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
  deleteAsset() {
    return this.showProjectService.deleteAsset(this.rowData.assetId).subscribe(() => {
        this.toast.showToast('success', this.constants.SUCCESS,
          this.constants.ASSET_OPERATION_DELETE);
        this.refresh.emit(null);
      },
      () => {
        this.toast.showToast('danger', this.constants.FAILURE,
          this.constants.FAILURE_TEXT);
      });
  }

}
