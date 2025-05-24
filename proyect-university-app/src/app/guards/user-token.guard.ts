import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiVentasService } from '../services/api-ventas.service';

export const userTokenGuard: CanActivateFn = (route, state) => {
  
  let ventasService = inject(ApiVentasService),
    router = inject(Router);

  const token = String(sessionStorage.getItem("tokenUserSession")?.split(".")),
    rolUser: any = window.atob(token[1]);

  let rol: any = rolUser.rol,
    isAdmin = false;

  ventasService.getRolUser(rol).subscribe({
    next: (response: any) => {
      response.data.forEach((data: any) => {
          if(data.rol === "admin"){
            isAdmin = true;
          }else{
            isAdmin = false;
          }
      });  
    },
    error: (err) => console.error(err)
  })
  
  return isAdmin;
};
