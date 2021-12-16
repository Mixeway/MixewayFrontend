import {Component, Input, OnInit} from '@angular/core';
import {ProjectStats} from '../../../@core/Model/ProjectStats';
import {ProjectInfo} from '../../../@core/Model/ProjectInfo';

@Component({
  selector: 'ngx-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  options: any;
  @Input()
  projectStats: ProjectStats;
  @Input()
  projectInfo: ProjectInfo;

  constructor() {
  }

  ngOnInit(): void {
  }

}
