import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiOperationsListElementComponent } from './ci-operations-list-element.component';

describe('CiOperationsListElementComponent', () => {
  let component: CiOperationsListElementComponent;
  let fixture: ComponentFixture<CiOperationsListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiOperationsListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiOperationsListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
