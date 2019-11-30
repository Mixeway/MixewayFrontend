import { Component, OnInit } from '@angular/core';
import {CiOpeerationsService} from '../../@core/service/CiOpeerationsService';
import {CiOperations} from '../../@core/Model/CiOperations';
import {CiresultColorComponent} from '../extra-components/ciresult-color.component';
import {CicdConstants} from '../../@core/constants/CicdConstants';

@Component({
  selector: 'ngx-cicd',
  templateUrl: './cicd.component.html',
  styleUrls: ['./cicd.component.scss'],
})
export class CicdComponent implements OnInit {
  sourcesData: CiOperations[];
  settings: any;
  constants: CicdConstants = new CicdConstants();

  constructor(private ciOperationsService: CiOpeerationsService) {
    this.loadSettings();
    this.loadSourceData();
  }

  ngOnInit() {
  }
  loadSourceData() {
    return this.ciOperationsService.getTableData().subscribe(data => {
      this.sourcesData = data;
    });
  }
  loadSettings() {
    this.settings = {
      actions: false,
      add: false,
      edit: false,
      delete: false,
      columns: {
        name: {
          title: this.constants.CICD_TABLE_PROJECT_NAME,
          type: 'html',
          valuePrepareFunction: (cell, row) => {
            return `<b>${row.codeProject ? row.codeProject.name + ' [' +
              row.codeProject.codeGroup.name + ']' : row.codeGroup.name}</b>`;
          },
        },
        vulnNumber: {
          title: this.constants.CICD_TABLE_VULN_NUMBER,
          type: 'number',
        },
        result: {
          title: this.constants.CICD_TABLE_SCORE,
          type: 'custom',
          renderComponent: CiresultColorComponent,
        },
        inserted: {
          title: this.constants.CICD_TABLE_INSERTED,
          type: 'string',
          sortDirection: 'desc',
        },
      },
    };
  }
}
