import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiVentasService } from '../services/api-ventas.service';

export const userTokenGuard: CanActivateFn = (route, state) => {
  
  let ventasService = inject(ApiVentasService);
  
  return true;
};
