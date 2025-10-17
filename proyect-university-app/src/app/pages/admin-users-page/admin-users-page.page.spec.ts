import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUsersPagePage } from './admin-users-page.page';

describe('AdminUsersPagePage', () => {
  let component: AdminUsersPagePage;
  let fixture: ComponentFixture<AdminUsersPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
