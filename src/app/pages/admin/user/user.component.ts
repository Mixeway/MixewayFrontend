import {Component, OnInit, TemplateRef} from '@angular/core';
import {Proxies} from '../../../@core/Model/Proxies';
import {User} from '../../../@core/Model/User';
import {AdminConstants} from '../../../@core/constants/AdminConstants';
import {NbDialogService} from '@nebular/theme';
import {Toast} from '../../../@core/utils/Toast';
import {AdminService} from '../../../@core/service/AdminService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  proxies: Proxies[];
  auth: boolean;
  index = 1;
  role: string;
  users: User[];
  settings: any = {};
  userForm;
  changePasswordForm;
  isAdmin: boolean = false;
  constants: AdminConstants = new AdminConstants();


  constructor(private dialogService: NbDialogService, private toast: Toast,
              private adminService: AdminService, private router: Router,
              private cookieService: CookieService,
              private formBuilder: FormBuilder) {
    this.role = this.cookieService.get('role');
    if (this.role !== 'ROLE_ADMIN') {
      this.router.navigate(['/pages/dashboard']);
    } else {
      this.isAdmin = true;
    }
    this.userForm = this.formBuilder.group({
      userRole:  ['', Validators.required],
      userCN:  ['', Validators.required],
      userUsername: ['', Validators.required],
      userPassword: '',
      passwordAuth: false,
    });
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
    });
    this.loadUsers();
  }
  loadUsers() {
    return this.adminService.getUsers().subscribe(data => {
      // @ts-ignore
      this.users = data.body;
    });
  }
  openCreateApiDialog(dialog: TemplateRef<any>, scanner: any) {
    this.dialogService.open(
      dialog,
      { context: scanner });
  }


  saveUser(value: any, ref) {
    if (this.userForm.valid) {
      return this.adminService.addUser(this.userForm.value).subscribe(() => {
          this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_USER_SAVE);
          this.loadUsers();
          ref.close();
        },
        () => {
          this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
        });
    }
  }

  enableUser(id: number) {
    return this.adminService.enableUser(id).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_USER_UNBLOCK);
        this.loadUsers();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  disableUser(id: number) {
    return this.adminService.disableUser(id).subscribe(() => {
        this.toast.showToast('success', this.constants.TOAST_SUCCESS, this.constants.OPERATION_SUCCESS_USER_BLOCK);
        this.loadUsers();
      },
      () => {
        this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
      });
  }

  changePassowordSubmit(value: any, ref, id) {
    if (this.changePasswordForm.valid) {
      return this.adminService.changePassword(id, this.changePasswordForm.value).subscribe(() => {
          this.toast.showToast('success', this.constants.TOAST_SUCCESS,
            this.constants.OPERATION_SUCCESS_PASSWORD_CHANGE);
          this.loadUsers();
          ref.close();
        },
        () => {
          this.toast.showToast('danger', this.constants.TOAST_FAILED, this.constants.OPERATION_FAILED);
        });
    }
  }
  ngOnInit() {
  }

}
