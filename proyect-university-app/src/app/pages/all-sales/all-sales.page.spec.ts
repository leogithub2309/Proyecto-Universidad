import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllSalesPage } from './all-sales.page';

describe('AllSalesPage', () => {
  let component: AllSalesPage;
  let fixture: ComponentFixture<AllSalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
