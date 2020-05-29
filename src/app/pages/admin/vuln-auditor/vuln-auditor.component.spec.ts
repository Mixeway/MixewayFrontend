import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VulnAuditorComponent } from './vuln-auditor.component';

describe('VulnAuditorComponent', () => {
  let component: VulnAuditorComponent;
  let fixture: ComponentFixture<VulnAuditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VulnAuditorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VulnAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
