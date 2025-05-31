import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllSoldsPage } from './all-solds.page';

describe('AllSoldsPage', () => {
  let component: AllSoldsPage;
  let fixture: ComponentFixture<AllSoldsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSoldsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
