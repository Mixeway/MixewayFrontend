import { Component, OnInit } from '@angular/core';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectDetailsAudit} from '../../../@core/Model/ProjectDetailsAudit';

@Component({
  selector: 'ngx-details-carts',
  templateUrl: './details-carts.component.html',
  styleUrls: ['./details-carts.component.scss'],
})
export class DetailsCartsComponent implements OnInit {
  details: ProjectDetailsAudit;
  _entityId: any;

  constructor(private showProjectService: ShowProjectService, private _route: ActivatedRoute,
              private router: Router) {
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loadTrendChartData();
  }

  loadTrendChartData() {
    return this.showProjectService.getProjectVulnDetailsAudit(this._entityId).subscribe(data => {
      this.details = data;
      if (Number(this.details.averageTimeToResolve) > 0) {
        const originalNumber: number = Number(this.details.averageTimeToResolve);
        const dividedNumber: number = originalNumber / 24;
        const roundedNumber: number = parseFloat(dividedNumber.toFixed(1));
        this.details.averageTimeToResolve = roundedNumber + '';
      } else {
        this.details.averageTimeToResolve = 'n/a';
      }
    });
  }
}
