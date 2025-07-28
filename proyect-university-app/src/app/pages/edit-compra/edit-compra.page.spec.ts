import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCompraPage } from './edit-compra.page';

describe('EditCompraPage', () => {
  let component: EditCompraPage;
  let fixture: ComponentFixture<EditCompraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
