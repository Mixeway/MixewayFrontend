import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebConfigureTabComponent } from './web-configure-tab.component';

describe('WebConfigureTabComponent', () => {
  let component: WebConfigureTabComponent;
  let fixture: ComponentFixture<WebConfigureTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebConfigureTabComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebConfigureTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
