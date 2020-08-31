import { Component } from '@angular/core';
import { MixerProgresComponent } from '../../extra-components/mixer-progres/mixer-progres.component';
import {DashboardService} from '../../../@core/service/DashboardService';
import {Project} from '../../../@core/Model/Project';
import {Toast} from '../../../@core/utils/Toast';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {DashboardConstants} from '../../../@core/constants/DashboardConstants';
import {VulnmanageColorComponent} from '../../extra-components/vulnmanage-color.component';


@Component({
  selector: 'ngx-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss'],
  entryComponents: [VulnmanageColorComponent],
})
export class ProjectTableComponent {
  projects: Project[] = [];
  role: string;
  settings: any;
  loading: boolean = true;
  constants: DashboardConstants = new DashboardConstants();
  constructor( private dashboardService: DashboardService, private toast: Toast, private cookieService: CookieService,
               private router: Router) {
    this.role = this.cookieService.get('role');
    this.loadSettings();
    this.getProjects();
  }
  loadSettings() {
    this.settings = {
      actions: {
        add: true,
        edit: true,
        delete: true,
      },
      add: {
        title: this.constants.DASHBOARD_TABLE_ADD,
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        name: {
          title: this.constants.DASHBOARD_RABLE_PROJECT_NAME,
          type: 'html',
          valuePrepareFunction: (cell) => {
            return `<b>${cell}</b>`;
          },
          width: '20%',
        },
        description: {
          title: this.constants.DASHBOARD_TABLE_DESCRIPTION,
          type: 'string',
          width: '35%',
        },
        ciid: {
          title: this.constants.DASHBOARD_TABLE_EXTERNALID,
          type: 'string',
          width: '10%',
        },
        enableVulnManage: {
          title: this.constants.DASHBOARD_TABLE_VULNMANAGE,
          type: 'custom',
          renderComponent: VulnmanageColorComponent,
          width: '10%',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [
                {value: '1', title: 'Enabled'},
                {value: '0', title: 'Disabled'},
              ],
            },
          },
          filter: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [
                {value: '1', title: 'Enabled'},
                {value: '0', title: 'Disabled'},
              ],
            },
          },
        },
        risk: {
          title: this.constants.DASHBOARD_TABLE_RISK,
          type: 'custom',
          sortDirection: 'desc',
          addable: false,
          editable: false,
          width: '25%',
          renderComponent: MixerProgresComponent,
          filter: false,
        },
      },
    };
  }
  getProjects() {
    return this.dashboardService.getProjects().subscribe(data => {
      this.projects = data;
      this.loading = false;
    });
  }
  deleteProject(id) {
    return this.dashboardService.deleteProject(id).subscribe(
      data => {
        this.toast.showToast('success', this.constants.DASHBOARD_TOAST_TITLE_SUCCESS,
          this.constants.DASHBOARD_OPERATION_PROJECT_DELETE_SUCCESS);
      },
      error => {
        this.toast.showToast('danger', this.constants.DASHBOARD_TOAST_TITLE_FAILURE,
          this.constants.DASHBOARD_OPERATION_PROJECT_DELETE_FAILURE);
      });
  }
  createProject(name, description, ciid, enableVulnManage) {
    return this.dashboardService.addProject(name, description, ciid, enableVulnManage).subscribe(
      data => {
        this.toast.showToast('success', this.constants.DASHBOARD_TOAST_TITLE_SUCCESS,
          this.constants.DASHBOARD_OPERATION_PROJECT_ADD_SUCCESS + name);
      },
      error => {
        this.toast.showToast('danger', this.constants.DASHBOARD_TOAST_TITLE_FAILURE,
          this.constants.DASHBOARD_OPERATION_PROJECT_ADD_FAILURE);
      });
  }
  editProject(id, project) {
    return this.dashboardService.editProject(id, project).subscribe(
      data => {
        this.toast.showToast('success', this.constants.DASHBOARD_TOAST_TITLE_SUCCESS,
          this.constants.DASHBOARD_OPERATION_PROJECT_EDIT_SUCCESS + project.name);
        this.getProjects();
      },
      error => {
        this.toast.showToast('danger', this.constants.DASHBOARD_TOAST_TITLE_FAILURE,
          this.constants.DASHBOARD_OPERATION_PROJECT_EDIT_FAILURE);
      });
  }


  async onDeleteConfirm(event) {
    if (window.confirm(this.constants.DASHBOARD_OPERATION_PROJECT_DELETE_CONFIRMATION_1 + '### ' + event.data.name + ' ###' +
    this.constants.DASHBOARD_OPERATION_PROJECT_DELETE_CONFIRMATION_2)) {
      this.deleteProject(event.data.id);
      await this.delay(500);
      this.getProjects();
    } else {
      event.confirm.reject();
    }
  }
  onCustom(event) {
    this.router.navigate(['/pages/show/project/' + event.data.id]);
  }
  async onCreateConfirm(event) {
    const name = event.newData.name;
    const description = event.newData.description;
    const ciid = event.newData.ciid;
    const enableVulnManage = event.newData.enableVulnManage;
    if (name && description && ciid) {
      this.createProject(name, description, ciid, enableVulnManage);
      await this.delay(500);
      this.getProjects();
      event.confirm.resolve(event.newData);
    } else {
      this.toast.showToast('danger', this.constants.DASHBOARD_TOAST_TITLE_FAILURE,
        this.constants.DASHBOARD_OPERATION_PROJECT_ADD_FAILURE);
      event.reject.resolve(event.newData);
    }
  }
  async onEditConfirm(event) {
    const project: Project = {
      ciid: event.newData.ciid,
      name: event.newData.name,
      description: event.newData.description,
      id: event.newData.id,
      risk: event.newData.risk,
      enableVulnManage: event.newData.enableVulnManage,
    };
    this.editProject(event.data.id, project);
    await this.delay(500);
    this.getProjects();
    event.confirm.resolve(event.data);
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
