import { Component, OnInit } from '@angular/core';
import {TutorialConstants} from '../../../@core/constants/TutorialConstants';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  tutorialConstants: TutorialConstants = new TutorialConstants();

  constructor() {
  }

  ngOnInit() {
  }

}
