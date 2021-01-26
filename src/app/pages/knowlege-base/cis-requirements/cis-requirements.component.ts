import { Component, OnInit } from '@angular/core';
import {KnowlegeBaseConstants} from '../../../@core/constants/KnowlegeBaseConstants';
import {KnowlegeBaseService} from '../../../@core/service/KnowlegeBaseService';
import {CisRequirement} from '../../../@core/Model/Vulnerability';
import {Toast} from '../../../@core/utils/Toast';
import {CookieService} from 'ngx-cookie-service';
import {AlertColorComponent} from '../../extra-components/alert-color.component';

@Component({
  selector: 'ngx-cis-requirements',
  templateUrl: './cis-requirements.component.html',
  styleUrls: ['./cis-requirements.component.scss'],
})
export class CisRequirementsComponent implements OnInit {

  constants: KnowlegeBaseConstants = new KnowlegeBaseConstants();
  cisRequirements: CisRequirement[];
  settings;
  role;
  constructor(private knowlegeBaseService: KnowlegeBaseService, private toast: Toast,
              private cookieService: CookieService) {
    this.role = this.cookieService.get('role');
    this.loadCisRequirements();
    this.setSettings();
  }

  loadCisRequirements() {
    return this.knowlegeBaseService.getRequirements().subscribe(data => {
      // @ts-ignore
      this.cisRequirements = data.body;
    });
  }
  setSettings() {
    this.settings = {
      actions: {
        add: false,
        edit: this.role === 'ROLE_ADMIN',
        delete: false,
      },
      add: {
        title: 'Dodaj Wymaganie',
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      columns: {
        name: {
          title: 'Name',
          editable: false,
        },
        type: {
          title: 'Benchmark Type',
          editable: false,
        },
        severity: {
          title: 'Custom Severity',
          type: 'custom',
          renderComponent: AlertColorComponent,
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [
                {value: 'Critical', title: 'Critical'},
                {value: 'High', title: 'High'},
                {value: 'Medium', title: 'Medium'},
                {value: 'Low', title: 'Low'},
                {value: 'Info', title: 'Info'},
              ],
            },
          },
          filter: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [
                {value: 'Critical', title: 'Critical'},
                {value: 'High', title: 'High'},
                {value: 'Medium', title: 'Medium'},
                {value: 'Low', title: 'Low'},
                {value: 'Info', title: 'Info'},
              ],
            },
          },
        },
      },
    };
  }

  async onEditConfirm(event) {
    return this.knowlegeBaseService.editRequirementSeverity(event.data.id, event.newData.severity).subscribe(
      data => {
        this.toast.showToast('success', this.constants.CIS_REQUIREMENT_UPDATED_HEADER,
          this.constants.CIS_REQUIREMENT_UPDATED_VALUE + ' ' + event.newData.severity);
        this.loadCisRequirements();
        event.confirm.resolve(event.data);
      },
      error => {
        this.toast.showToast('danger', this.constants.CIS_REQUIREMENT_NOTUPDATED_HEADER,
          this.constants.CIS_REQUIREMENT_NOTUPDATED_VALUE);
        event.confirm.resolve(event.data);
      });
  }

  ngOnInit(): void {
  }

}
