import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectDetailsChartComponent } from './show-project-details-chart.component';

describe('ShowProjectDetailsChartComponent', () => {
  let component: ShowProjectDetailsChartComponent;
  let fixture: ComponentFixture<ShowProjectDetailsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProjectDetailsChartComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProjectDetailsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
