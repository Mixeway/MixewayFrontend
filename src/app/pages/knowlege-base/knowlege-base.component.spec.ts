import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowlegeBaseComponent } from './knowlege-base.component';

describe('KnowlegeBaseComponent', () => {
  let component: KnowlegeBaseComponent;
  let fixture: ComponentFixture<KnowlegeBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowlegeBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowlegeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
