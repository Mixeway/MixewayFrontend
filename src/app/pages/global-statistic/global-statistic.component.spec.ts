import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalStatisticComponent } from './global-statistic.component';

describe('GlobalStatisticComponent', () => {
  let component: GlobalStatisticComponent;
  let fixture: ComponentFixture<GlobalStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalStatisticComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
