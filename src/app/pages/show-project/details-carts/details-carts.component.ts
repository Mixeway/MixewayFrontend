import { Component, OnInit } from '@angular/core';
import {ShowProjectService} from '../../../@core/service/ShowProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectDetailsAudit} from '../../../@core/Model/ProjectDetailsAudit';
import {DetailStats} from '../../../@core/Model/DetailStats';

@Component({
  selector: 'ngx-details-carts',
  templateUrl: './details-carts.component.html',
  styleUrls: ['./details-carts.component.scss'],
})
export class DetailsCartsComponent implements OnInit {
  details: DetailStats;
  _entityId: any;

  constructor(private showProjectService: ShowProjectService, private _route: ActivatedRoute,
              private router: Router) {
    this._entityId = +this._route.snapshot.paramMap.get('projectid');
    if (!this._entityId) {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails() {
    return this.showProjectService.getDetailStats(this._entityId).subscribe(data => {
      this.details = data;
    });
  }


}
