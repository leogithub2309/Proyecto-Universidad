import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiVentasService } from '../services/api-ventas.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';

export const userTokenGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router),
    cookieService = inject(CookieService),
    isAdminServices = inject(LoginService);

  if(!sessionStorage.getItem("tokenUserSession") || !cookieService.check("tokenUser")){
    router.createUrlTree(['/home']);
    return false;
  }else{
    
    if(isAdminServices.isAdmin()){
      return true;
    }

    router.createUrlTree(['/dashboard']);

    return false;
  }

 
};
