import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendChartComponent } from './trend-chart.component';

describe('TrendChartComponent', () => {
  let component: TrendChartComponent;
  let fixture: ComponentFixture<TrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
