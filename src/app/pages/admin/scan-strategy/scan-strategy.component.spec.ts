import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanStrategyComponent } from './scan-strategy.component';

describe('ScanStrategyComponent', () => {
  let component: ScanStrategyComponent;
  let fixture: ComponentFixture<ScanStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanStrategyComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
