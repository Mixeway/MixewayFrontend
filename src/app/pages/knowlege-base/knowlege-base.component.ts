import { Component, OnInit } from '@angular/core';
import {KnowlegeBaseConstants} from '../../@core/constants/KnowlegeBaseConstants';

@Component({
  selector: 'ngx-knowlege-base',
  templateUrl: './knowlege-base.component.html',
  styleUrls: ['./knowlege-base.component.scss'],
})
export class KnowlegeBaseComponent implements OnInit {
  constants: KnowlegeBaseConstants = new KnowlegeBaseConstants();

  constructor() { }

  ngOnInit(): void {
  }

}
