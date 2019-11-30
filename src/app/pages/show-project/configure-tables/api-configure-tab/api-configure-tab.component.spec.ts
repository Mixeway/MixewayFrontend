import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiConfigureTabComponent } from './api-configure-tab.component';

describe('ApiConfigureTabComponent', () => {
  let component: ApiConfigureTabComponent;
  let fixture: ComponentFixture<ApiConfigureTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiConfigureTabComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiConfigureTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
