import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditVentaPage } from './edit-venta.page';

describe('EditVentaPage', () => {
  let component: EditVentaPage;
  let fixture: ComponentFixture<EditVentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
