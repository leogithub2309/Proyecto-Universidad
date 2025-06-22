import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprasDetailsPage } from './compras-details.page';

describe('ComprasDetailsPage', () => {
  let component: ComprasDetailsPage;
  let fixture: ComponentFixture<ComprasDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
