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
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data/src/query';
import { EmitType } from '@syncfusion/ej2-base/src/base';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  asd: any = 'ROLE_EDITOR_RUNNER';
  proxies: Proxies[];
  projects: { [key: string]: Object; }[] = [];
  auth: boolean;
  index = 1;
  role: string;
  users: User[];
  settings: any = {};
  userForm;
  changePasswordForm;
  isAdmin: boolean = false;
  constants: AdminConstants = new AdminConstants();
  public fields: Object = { text: 'name', value: 'id' };

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
      projects: null,
    });
    this.changePasswordForm = this.formBuilder.group({
      newPassword: '',
      role:  '',
      projects: '',
    });
    this.loadUsers();
    this.loadProjects();
  }
  loadUsers() {
    return this.adminService.getUsers().subscribe(data => {
      // @ts-ignore
      this.users = data.body;
    });
  }
  loadProjects() {
    return this.adminService.getProjects().subscribe(data => {
      for (const obj of data) {
        this.projects.push({ name: obj.name, id: obj.id });
      }
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

  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    e.updateData(this.projects, query);
  }


  getUserById(data) {
    return this.users.filter(u => u.id === data)[0];
  }

  openEditUserDialog(dialog: TemplateRef<any>, scanner: any) {
    const projectIds: number[] = [];
    for (const project of this.getUserById(scanner).projects) {
      projectIds.push(project.id);
    }
    this.changePasswordForm.controls.role.setValue(this.getUserById(scanner).permisions);
    this.changePasswordForm.controls.projects.setValue(projectIds);
    this.dialogService.open(
      dialog,
      { context: scanner });
  }

  getRoleForUser(id: number) {
    const user = this.getUserById(id);
    return this.constants.USER_GROUPS.filter(group => group.id === user.permisions)[0].name;
  }
}
