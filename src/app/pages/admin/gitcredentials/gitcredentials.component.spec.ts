import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitcredentialsComponent } from './gitcredentials.component';

describe('GitcredentialsComponent', () => {
  let component: GitcredentialsComponent;
  let fixture: ComponentFixture<GitcredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitcredentialsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitcredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
