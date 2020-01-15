import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {ProjectConstants} from '../../@core/constants/ProjectConstants';
import {BugTrackerService} from '../../@core/service/BugTrackerService';
import {Toast} from '../../@core/utils/Toast';

@Component({
  template: `
      <button nbButton status="warning" size="medium" (click)="issueTicket()" [disabled]="rowData.ticketId!=null"
              [nbTooltip]="constants.PROJECT_TOOLTIP_ISSUETICKET">
          <nb-icon icon="upload-outline" pack="eva" [options]="{ animation: { type: 'pulse' } }"></nb-icon></button>
  `,
})
export class BugComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  constants: ProjectConstants = new ProjectConstants();
  ngOnInit(): void {
  }
  constructor(private bugTrackingService: BugTrackerService, private toast: Toast) {}

  issueTicket() {
    if (confirm(this.constants.CONFIIRM_BUG_ISSUE)) {
      let projectId: number;
      if (this.rowData.type === 'infra') {
        projectId = this.rowData.intf.asset.project.id;
      } else if (this.rowData.type === 'webapp') {
        projectId = this.rowData.webapp.project.id;
      } else if (this.rowData.type === 'code' ) {
        projectId = this.rowData.codeGroup.project.id;
      }
      return this.bugTrackingService.issueTicket(projectId, this.rowData.type,
        this.rowData.id).subscribe(() => {
        this.toast.showToast('success', this.constants.PROJECT_OPERATION_SUBMITISSUE,
          this.constants.PROJECT_JIRA_TICKET_ISSUED);
        this.refresh.emit(this.rowData);
      }, () => {
        this.toast.showToast('danger', this.constants.PROJECT_OPERATION_FAILURE,
          this.constants.PROJECT_JIRA_TICKET_ISSUED_FAILURE);
      });
    }
  }
}
