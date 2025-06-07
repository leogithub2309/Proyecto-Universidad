import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddInventarioPage } from './add-inventario.page';

describe('AddInventarioPage', () => {
  let component: AddInventarioPage;
  let fixture: ComponentFixture<AddInventarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
