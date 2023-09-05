import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCartsComponent } from './details-carts.component';

describe('DetailsCartsComponent', () => {
  let component: DetailsCartsComponent;
  let fixture: ComponentFixture<DetailsCartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
