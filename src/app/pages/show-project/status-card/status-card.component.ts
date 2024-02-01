import {Component, Input, OnInit} from '@angular/core';
import {ProjectStats} from '../../../@core/Model/ProjectStats';
import {ProjectInfo} from '../../../@core/Model/ProjectInfo';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <div class="row">
      <nb-card>
        <div class="icon-container">
          <div [class]="'icon status-' + color">
            <nb-icon icon="award-outline" pack="eva"></nb-icon>
          </div>
        </div>
        <div class="details">
          <div class="title h5">{{grade}}</div>
          <div class="status paragraph-2">Grade</div>
        </div>
      </nb-card>&nbsp;

      <nb-card>
        <div class="centrize">
          <h6>Vulnerabilities detected</h6>
          <nb-alert status="danger" nbTooltip="Critical or High Severity">{{projectStats?.vulnCrit}}</nb-alert>&nbsp;
          <nb-alert status="warning" nbTooltip="Medium Severity">{{projectStats?.vulnMedium}}</nb-alert>&nbsp;
          <nb-alert status="primary" nbTooltip="Low Severity">{{projectStats?.vulnLow}}</nb-alert>
        </div>
      </nb-card>&nbsp;
      <nb-card>
        <table>
          <tr>
            <td><b>Assets</b></td>
            <td class="right-aligned">{{projectStats?.assets}}</td>
          </tr>
          <tr>
            <td><b>WebApps</b></td>
            <td class="right-aligned">{{projectStats?.webApps}}</td>
          </tr>
          <tr>
            <td><b>Code Repos</b></td>
            <td class="right-aligned">{{projectStats?.repos}}</td>
          </tr>
        </table>
      </nb-card>
    </div>
  `,
})
export class StatusCardComponent implements OnInit {
  @Input()
  projectStats: ProjectStats;
  @Input()
  projectInfo: ProjectInfo;
  grade: String;
  color: String;

  ngOnInit(): void {
    if (this.projectInfo.risk === 0) {
      this.grade = 'A+';
      this.color = 'success';
    } else if (this.projectInfo.risk < 20) {
      this.grade = 'A';
      this.color = 'success';
    } else if (this.projectInfo.risk < 40) {
      this.grade = 'B';
      this.color = 'warning';
    } else if (this.projectInfo.risk < 70) {
      this.grade = 'C';
      this.color = 'danger';
    } else {
      this.grade = 'D';
      this.color = 'danger';
    }
  }
}
