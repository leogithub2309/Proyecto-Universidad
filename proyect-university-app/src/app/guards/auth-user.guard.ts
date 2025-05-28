import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authUserGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router),
    cookieService = inject(CookieService);

  if(sessionStorage.getItem("tokenUserSession") || cookieService.check("tokenUser")){
    let separate = String(sessionStorage.getItem("tokenUserSession")).split(".");

    const encrypt = window.atob(separate[1]),
      userInfo = JSON.parse(encrypt);

    if(userInfo.user) {
      return true;
    }

    return router.createUrlTree(['/dashboard']);
  }else{
    return router.createUrlTree(['/home']);
  }

  
};
