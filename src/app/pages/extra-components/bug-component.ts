import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {ProjectConstants} from '../../@core/constants/ProjectConstants';
import {BugTrackerService} from '../../@core/service/BugTrackerService';
import {Toast} from '../../@core/utils/Toast';

@Component({
  template: `
      <button nbButton status="warning" size="medium" (click)="issueTicket()" [disabled]="isDisabled"
              [nbTooltip]="constants.PROJECT_TOOLTIP_ISSUETICKET">
          <nb-icon icon="upload-outline" pack="eva" [options]="{ animation: { type: 'pulse' } }"></nb-icon></button>
  `,
})
export class BugComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  constants: ProjectConstants = new ProjectConstants();
  isDisabled: boolean = true;
  ngOnInit(): void {
    // Check if should be disabled
    if (this.rowData.ticketId != null) {
      this.isDisabled = true;
    } else if (this.rowData.osBug && this.rowData.source === 'OpenSource') {
      this.isDisabled = false;
    } else if (this.rowData.codeBug && this.rowData.source === 'SourceCode') {
      this.isDisabled = false;
    } else if (this.rowData.webAppBug && this.rowData.source === 'WebApplication') {
      this.isDisabled = false;
    } else if (this.rowData.networkBug && this.rowData.source === 'Network') {
      this.isDisabled = false;
    }
  }
  constructor(private bugTrackingService: BugTrackerService, private toast: Toast) {}

  issueTicket() {
    if (confirm(this.constants.CONFIIRM_BUG_ISSUE)) {
      return this.bugTrackingService.issueTicket(this.rowData.projectId, this.rowData.source,
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
