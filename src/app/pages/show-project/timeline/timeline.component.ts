import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectAudit} from '../../../@core/Model/ProjectAudit';


interface EventItem {
  status?: 'Project Created' | 'Vulnerabilities Added' | 'Vulns re-detected' | 'Resolved Vulns';
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}

@Component({
  selector: 'ngx-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, AfterViewInit {
  events: EventItem[] = [];
  _entityId: any;
  audits: ProjectAudit[];

  constructor(private showProjectService: ShowProjectService, private _route: ActivatedRoute,
              private router: Router) {
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }

  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.loadTrendChartData();

  }

  loadTrendChartData() {
    return this.showProjectService.getProjectVulnAudit(this._entityId).subscribe(data => {
      this.audits = data;
      this.events.push({ status: 'Project Created', date: '', icon: 'edit-outline', color: 'rgba(102,243,232,0.71)' });
      for (const item of data) {
        if (item.eventType === 'CREATED') {
          this.events.push(
            {status: 'Vulnerabilities Added', date: item.start + ', number: ' + item.occurances, icon: 'plus-outline',
              color: 'rgba(218,58,89,0.71)'},
          );
        } else if (item.eventType === 'UPDATED') {
          this.events.push(
            {status: 'Vulns re-detected', date: item.start + ', number: ' + item.occurances, icon: 'share-outline',
              color: 'rgba(41,110,185,0.71)'},
          );

        } else if (item.eventType === 'RESOLVED') {
          this.events.push(
            {status: 'Resolved Vulns', date: item.end + ', number: ' + item.occurances, icon: 'checkmark-outline',
              color: 'rgba(96,164,75,0.71)'},
          );
        }
      }
      const eventTypeOrder = { 'Vulnerabilities Added': 0, 'Vulns re-detected': 1, 'Resolved Vulns': 2 };

      this.events.sort((a, b) => {
        if (a.date === '') return -1;
        if (b.date === '') return 1;

        const dateA = new Date(a.date.split(', ')[0]);
        const dateB = new Date(b.date.split(', ')[0]);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        return eventTypeOrder[a.status] - eventTypeOrder[b.status];
      });
    });
  }
}
