import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureTablesComponent } from './configure-tables.component';

describe('ConfigureTablesComponent', () => {
  let component: ConfigureTablesComponent;
  let fixture: ComponentFixture<ConfigureTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureTablesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
