import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeConfigureTabComponent } from './code-configure-tab.component';

describe('CodeConfigureTabComponent', () => {
  let component: CodeConfigureTabComponent;
  let fixture: ComponentFixture<CodeConfigureTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeConfigureTabComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeConfigureTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
