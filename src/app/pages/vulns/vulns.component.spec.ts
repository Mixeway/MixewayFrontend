import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VulnsComponent } from './vulns.component';

describe('VulnsComponent', () => {
  let component: VulnsComponent;
  let fixture: ComponentFixture<VulnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VulnsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VulnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
