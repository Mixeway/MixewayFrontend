import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiOperationsComponent } from './ci-operations.component';

describe('CiOperationsComponent', () => {
  let component: CiOperationsComponent;
  let fixture: ComponentFixture<CiOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiOperationsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
