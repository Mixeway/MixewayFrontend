import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {AdminService} from '../../../@core/service/AdminService';
import {GitCredentials} from '../../../@core/Model/GitCredentials';
import {FormBuilder, Validators} from '@angular/forms';
import {NbDialogService} from '@nebular/theme';
import {Toast} from '../../../@core/utils/Toast';

@Component({
  selector: 'ngx-gitcredentials',
  templateUrl: './gitcredentials.component.html',
  styleUrls: ['./gitcredentials.component.scss'],
})
export class GitcredentialsComponent implements OnInit {
  @Input() credentials: GitCredentials[];
  constants: AdminConstants = new AdminConstants();
  credsForm;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder,
              private dialogService: NbDialogService, private toast: Toast) {

    this.credsForm = this.formBuilder.group({
      url: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loadCreds();
  }

  ngOnInit(): void {
  }

  openCreateApiDialog(addGitCreds: TemplateRef<any>, param2) {
    this.dialogService.open(
      addGitCreds,
      { context: param2 });
  }

  addCreds(value: any, ref: any) {
    return this.adminService.createGitCreds(value).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_GITCREDS_ADD);
        this.loadCreds();
        ref.close();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }
  loadCreds() {
    return this.adminService.getGitCreds().subscribe(data => {
      this.credentials = data;
    });
  }
  deleteCredentials(id: number) {
    return this.adminService.deleteGitCreds(id).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_GITCREDS_DELETE);
        this.loadCreds();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });

  }
}
