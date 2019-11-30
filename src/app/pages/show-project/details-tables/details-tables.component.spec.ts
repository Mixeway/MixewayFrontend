import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTablesComponent } from './details-tables.component';

describe('DetailsTablesComponent', () => {
  let component: DetailsTablesComponent;
  let fixture: ComponentFixture<DetailsTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTablesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
