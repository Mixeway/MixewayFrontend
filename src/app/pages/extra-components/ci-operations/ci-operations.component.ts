import {Component, Input, OnInit} from '@angular/core';
import {CiOperations} from '../../../@core/Model/CiOperations';

@Component({
  selector: 'ngx-ci-operations',
  templateUrl: './ci-operations.component.html',
  styleUrls: ['./ci-operations.component.scss'],
})
export class CiOperationsComponent implements OnInit {
  @Input()
  ciOperations: CiOperations[];

  constructor() {
  }

  ngOnInit() {
  }

}
