import { TestBed } from '@angular/core/testing';

import { ApiComprasService } from './api-compras.service';

describe('ApiComprasService', () => {
  let service: ApiComprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
