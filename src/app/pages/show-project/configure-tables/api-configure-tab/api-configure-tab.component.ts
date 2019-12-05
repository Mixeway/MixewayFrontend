import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ShowProjectService} from '../../../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, Validators} from '@angular/forms';
import {Toast} from '../../../../@core/utils/Toast';
import {ProjectConstants} from '../../../../@core/constants/ProjectConstants';
import {BugTrackerService} from '../../../../@core/service/BugTrackerService';
import {BugTracker, BugTrackerType} from '../../../../@core/Model/BugTracker';
import {NbDialogService} from '@nebular/theme';
import {Proxies} from '../../../../@core/Model/Proxies';

@Component({
  selector: 'ngx-api-configure-tab',
  templateUrl: './api-configure-tab.component.html',
  styleUrls: ['./api-configure-tab.component.scss'],
})
export class ApiConfigureTabComponent implements OnInit {
  contactList: string;
  role: string;
  _entityId: number;
  contactListForm;
  constants: ProjectConstants = new ProjectConstants();
  @Input() projectId: number;
  apiKey: any = '';
  bugTrackingTypes: BugTrackerType[];
  bugTracker: BugTracker[];
  bugForm: any;
  proxies: Proxies[];

  constructor(private showProjectService: ShowProjectService, private _route: ActivatedRoute, private router: Router,
              private cookieService: CookieService, private formBuilder: FormBuilder, private toast: Toast,
              private bugTrackingService: BugTrackerService, private dialogService: NbDialogService) {
    this.role = this.cookieService.get('role');
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }
    this.loadApiKey();
    this.loadProxies();
    this.loadBugTrackerType();
    this.loadBugTrackers();
    this.contactListForm = this.formBuilder.group({
      contactList: false,
    });
    this.bugForm = this.formBuilder.group({
      url:  ['', Validators.required],
      username:  ['', Validators.required],
      password: ['', Validators.required],
      bugTrackerType: [0, Validators.required],
      projectId: ['', Validators.required],
      issueType: ['', Validators.required],
      asignee: '',
      proxies: 0,
      project: {id: this._entityId},
      autoStrategy: ['', Validators.required],
      vulns: ['', Validators.required],
    });
  }

  loadApiKey() {
    return this.showProjectService.getApiKey(this._entityId).subscribe(data => {
      this.apiKey = data.apiKey;
    });
  }
  loadBugTrackerType() {
    return this.bugTrackingService.getBugTrackerTypes().subscribe(data => {
      this.bugTrackingTypes = data;
    });
  }
  loadBugTrackers() {
    return this.bugTrackingService.getBugTrackers(this._entityId).subscribe(data => {
      this.bugTracker = data;
    });
  }
  generateApiKey() {
    return this.showProjectService.generateApiKey(this._entityId).subscribe(data => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATION_APIKEY_GENERATE_SUCCESS);
        this.apiKey = data.apiKey;
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
  ngOnInit() {
  }
  saveContactList(contactList) {
    this.contactList = contactList;
  }
  copyApiKey() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.apiKey));
      e.preventDefault();
      document.removeEventListener('copy', null);
      this.toast.showToast('primary', this.constants.PROJECT_OPERATION_APIKEY_COPY_TITLE,
        this.constants.PROJECT_OPERATION_APIKEY_COPY);

    });
    document.execCommand('copy');
  }
  deleteApiKey() {
    return this.showProjectService.deleteApiKey(this._entityId).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATION_APIKEY_DELETE_SUCCESS);
        this.loadApiKey();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }
  openDialog(dialog: TemplateRef<any>, scanner: any) {
    this.dialogService.open(
      dialog,
      { context: scanner });
  }

  deleteBugTracker(id: number) {
    return this.bugTrackingService.deleteBugTracker(this._entityId, id).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
          this.constants.PROJECT_OPERATION_JIRA_SUCCESS);
        this.loadBugTrackers();
      },
      () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_OPERATION_FAILURES);
      });
  }

  saveBugTracker(value: any, ref) {
    if (this.bugForm.valid) {
      value.bugTrackerType = {id: value.bugTrackerType};
      if (value.proxies > 0) {
        value.proxies = {id: value.proxies};
      } else {
        value.proxies = null;
      }
      return this.bugTrackingService.saveBugTracker(this._entityId, value).subscribe(() => {
          this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUCCESS,
            this.constants.PROJECT_OPERATION_JIRA_SAVE_SUCCESS);
          this.loadBugTrackers();
          ref.close();
        },
        () => {
          this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
            this.constants.PROJECT_OPERATION_FAILURES_EXTENDED);
        });
    } else {
      this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
        this.constants.PROJECT_OPERATION_FAILURES_EXTENDED);
    }
  }
  loadProxies() {
    return this.showProjectService.getProxies().subscribe(data => {
      this.proxies = data;
    });
  }
}
