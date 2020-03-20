import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CiOperations} from '../../../@core/Model/CiOperations';

@Component({
  selector: 'ngx-ci-operations-list-element',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ci-operations-list-element.component.html',
  styleUrls: ['./ci-operations-list-element.component.scss'],
})
export class CiOperationsListElementComponent implements OnInit {
  @Input()
  ciOperation: CiOperations;
  resultBadge: string = 'primary';
  result: string = 'Running';
  constructor() { }

  ngOnInit() {
    if (this.ciOperation.result === 'Ok') {
      this.resultBadge = 'success';
      this.result = 'Success';
    } else if (this.ciOperation.result === 'Not Ok') {
      this.resultBadge = 'danger';
      this.result = 'Failure';
    }
  }

}
