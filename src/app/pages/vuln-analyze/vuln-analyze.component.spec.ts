import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VulnAnalyzeComponent } from './vuln-analyze.component';

describe('VulnAnalyzeComponent', () => {
  let component: VulnAnalyzeComponent;
  let fixture: ComponentFixture<VulnAnalyzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VulnAnalyzeComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VulnAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
