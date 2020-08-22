import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {Toast} from '../../../@core/utils/Toast';
import {ExtraConstants} from '../../../@core/constants/ExtraConstants';
import {FormBuilder} from '@angular/forms';
import {NbDialogService} from '@nebular/theme';
import {ViewCell} from 'ng2-smart-table';
import {CodeHelperModel} from '../../../@core/Model/CodeHelperModel';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-configure-code',
  templateUrl: './configure-code.component.html',
  styleUrls: ['./configure-code.component.scss'],
})
export class ConfigureCodeComponent implements OnInit, ViewCell {
    value: string;
  @Input() rowData: any;
  showOS: boolean = false;
  showSast: boolean = false;
  @Input() codeHelperModel: CodeHelperModel;
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  constants: ExtraConstants = new ExtraConstants();
  codeProjectForm;
  sastScanner: string;
  constructor(private dialogService: NbDialogService, private showProjectService: ShowProjectService,
              private toast: Toast, private formBuilder: FormBuilder, private router: Router) {
    this.codeProjectForm = this.formBuilder.group({
      dTrackUuid: '',
      sastProject: 0,
      branch: '',
      repoUrl: '',
      repoUsername: '',
      repoPassword: '',
    });
  }

  ngOnInit() {
    this.codeProjectForm.patchValue({
      dTrackUuid: this.rowData.dTrackUuid,
      sastProject: this.rowData.versionId,
      branch: this.rowData.branch,
    });
    this.codeHelperModel = <CodeHelperModel><unknown>this.value;
    if (this.codeHelperModel.scannerTypes
      .filter(scannerType => scannerType.name === this.constants.SCANNER_CHECKMARX).length > 0 ) {
      this.sastScanner = this.constants.SCANNER_CHECKMARX;
      this.showSast = true;
    } else  if (this.codeHelperModel.scannerTypes
      .filter(scannerType => scannerType.name === this.constants.SCANNER_FORTIFY).length > 0) {
      this.sastScanner = this.constants.SCANNER_FORTIFY;
      this.showSast = true;
    }
    if (this.codeHelperModel.scannerTypes
      .filter(scannerType => scannerType.name === this.constants.SCANNER_DTRACK).length > 0) {
      this.showOS = true;
    }
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



  saveCodeProject(ref) {
    return this.showProjectService.editCodeProject(this.rowData.id, this.codeProjectForm.value).subscribe(() => {
        this.toast.showToast('success', this.constants.SUCCESS,
          this.constants.CODE_OPERATION_CODE_DELETE);
        ref.close();
        this.refresh.emit(null);
      },
      () => {
        this.toast.showToast('danger', this.constants.FAILURE,
          this.constants.FAILURE_TEXT);
      });
  }
  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  createDTrack(ref) {
    return this.showProjectService.createDepTrackProject(this.rowData.id).subscribe(() => {
        this.toast.showToast('success', this.constants.SUCCESS,
          this.constants.CODE_OPERATION_CODE_DELETE);
        ref.close();
        this.refresh.emit(null);
      },
      () => {
        this.toast.showToast('danger', this.constants.FAILURE,
          this.constants.FAILURE_TEXT);
      });
  }

  createSast(ref) {
    return this.showProjectService.putProjectToRemote(+this.router.url.split('/')
      .reverse()[0], this.rowData.id).subscribe(() => {
        this.toast.showToast('success', this.constants.SUCCESS,
          this.constants.CODE_OPERATION_CODE_DELETE);
        ref.close();
        this.refresh.emit(null);
      },
      () => {
        this.toast.showToast('danger', this.constants.FAILURE,
          this.constants.FAILURE_TEXT);
      });
  }
}
