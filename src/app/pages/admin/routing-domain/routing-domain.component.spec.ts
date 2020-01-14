import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingDomainComponent } from './routing-domain.component';

describe('RoutingDomainComponent', () => {
  let component: RoutingDomainComponent;
  let fixture: ComponentFixture<RoutingDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingDomainComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
