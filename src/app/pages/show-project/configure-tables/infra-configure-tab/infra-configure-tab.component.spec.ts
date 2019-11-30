import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraConfigureTabComponent } from './infra-configure-tab.component';

describe('InfraConfigureTabComponent', () => {
  let component: InfraConfigureTabComponent;
  let fixture: ComponentFixture<InfraConfigureTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraConfigureTabComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraConfigureTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
