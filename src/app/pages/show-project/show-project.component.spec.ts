import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectComponent } from './show-project.component';

describe('ShowProjectComponent', () => {
  let component: ShowProjectComponent;
  let fixture: ComponentFixture<ShowProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProjectComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
