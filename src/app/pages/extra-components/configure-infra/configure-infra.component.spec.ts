import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureInfraComponent } from './configure-infra.component';

describe('ConfigureInfraComponent', () => {
  let component: ConfigureInfraComponent;
  let fixture: ComponentFixture<ConfigureInfraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureInfraComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureInfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
