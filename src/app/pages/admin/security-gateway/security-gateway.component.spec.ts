import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGatewayComponent } from './security-gateway.component';

describe('SecurityGatewayComponent', () => {
  let component: SecurityGatewayComponent;
  let fixture: ComponentFixture<SecurityGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGatewayComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
