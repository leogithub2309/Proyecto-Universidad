import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUsersPagesPage } from './edit-users-pages.page';

describe('EditUsersPagesPage', () => {
  let component: EditUsersPagesPage;
  let fixture: ComponentFixture<EditUsersPagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUsersPagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
