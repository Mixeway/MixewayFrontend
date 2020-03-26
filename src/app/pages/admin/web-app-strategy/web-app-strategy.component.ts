import {Component, Input, OnInit} from '@angular/core';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {AdminService} from '../../../@core/service/AdminService';
import {FormBuilder} from '@angular/forms';
import {WebAppScanStrategy} from '../../../@core/Model/WebAppScanStrategy';
import {Toast} from '../../../@core/utils/Toast';
import {ScannerType} from '../../../@core/Model/Scanner';

@Component({
  selector: 'ngx-web-app-strategy',
  templateUrl: './web-app-strategy.component.html',
  styleUrls: ['./web-app-strategy.component.scss'],
})
export class WebAppStrategyComponent implements OnInit {
  constants: AdminConstants = new AdminConstants();
  webAppStrategy: WebAppScanStrategy;
  webAppStrategyForm;
  @Input()
  scannerType: ScannerType[];
  webAppScannerTypes: ScannerType[];
  constructor(private toast: Toast,
              private adminService: AdminService,
              private formBuilder: FormBuilder) {
    this.loadStrategy();
    this.webAppStrategyForm = this.formBuilder.group({
      apiStrategy: '',
      guiStrategy: '',
      scheduledStrategy: '',
    });
  }

  loadStrategy() {
    return this.adminService.getWebAppScanStrategy().subscribe(data => {
      this.webAppStrategy = data;
      this.webAppStrategyForm.patchValue({
        apiStrategy: this.webAppStrategy.apiStrategy ? this.webAppStrategy.apiStrategy.name : '',
        guiStrategy: this.webAppStrategy.guiStrategy ? this.webAppStrategy.guiStrategy.name : '',
        scheduledStrategy: this.webAppStrategy.scheduledStrategy ? this.webAppStrategy.scheduledStrategy.name : '',
      });
    });
  }


  ngOnInit() {
    if (this.scannerType) {
      this.webAppScannerTypes = this.scannerType.filter(st => st.category === this.constants.SCANNER_CATEGORY_WEB);
    }
  }

  saveStrategy() {
    if (this.webAppStrategyForm.valid) {
      return this.adminService.editWebAppScanStrategy(this.webAppStrategyForm.value).subscribe(() => {
          this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_SET_STRATEGY);
        },
        () => {
          this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
        });
    }
  }
}
