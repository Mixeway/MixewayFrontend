import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CisRequirementsComponent } from './cis-requirements.component';

describe('CisRequirementsComponent', () => {
  let component: CisRequirementsComponent;
  let fixture: ComponentFixture<CisRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CisRequirementsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CisRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
