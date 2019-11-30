import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicdComponent } from './cicd.component';

describe('CicdComponent', () => {
  let component: CicdComponent;
  let fixture: ComponentFixture<CicdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicdComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
