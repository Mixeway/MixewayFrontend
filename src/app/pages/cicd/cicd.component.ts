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
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        codeProject: {
          title: this.constants.CICD_TABLE_PROJECT_NAME,
          valuePrepareFunction: (cell, row) => {
            return row.codeProject ? row.codeProject.name : row.codeGroup.name;
          },
          filterFunction(cell?: any, search?: string): boolean {
            const match = cell.name.indexOf(search) > -1;
            return match || search === '';
          },
          type: 'string',
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
          type: 'date',
          sortDirection: 'desc',
        },
      },
    };
  }
}
