import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiVentasService } from '../services/api-ventas.service';
import { CookieService } from 'ngx-cookie-service';

export const userTokenGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router),
    cookieService = inject(CookieService);

  let isLogin = true;

  if(!sessionStorage.getItem("tokenUserSession") || !cookieService.check("tokenUser")){
    isLogin = false;
  }

  return isLogin ? router.navigate(['/dashboard']) : router.navigate(['/home']);
};
