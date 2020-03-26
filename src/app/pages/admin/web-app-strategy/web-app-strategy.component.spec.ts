import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAppStrategyComponent } from './web-app-strategy.component';

describe('WebAppStrategyComponent', () => {
  let component: WebAppStrategyComponent;
  let fixture: ComponentFixture<WebAppStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebAppStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebAppStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
