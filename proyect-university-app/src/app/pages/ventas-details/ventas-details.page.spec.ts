import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentasDetailsPage } from './ventas-details.page';

describe('VentasDetailsPage', () => {
  let component: VentasDetailsPage;
  let fixture: ComponentFixture<VentasDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
