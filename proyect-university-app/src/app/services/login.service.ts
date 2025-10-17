import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, Register, Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly url:string = "http://localhost:3000/";
  http = inject(HttpClient);

  loginUser(form: Login): Observable<Response>{
    return this.http.post<Response>(this.url+"authUsuario", form);
  }

  registerUser(form: Register): Observable<Response>{
    return this.http.post<Response>(this.url+"crearUsuario", form);
  }

  isAdmin(): Boolean{

    let separate = String(sessionStorage.getItem("tokenUserSession")).split(".");

    const encrypt = window.atob(separate[1]),
      userInfo = JSON.parse(encrypt);

    if(userInfo.rol === 1 && userInfo.user){
      return true;
    }

    return false;
  }

  getAllUsers(){
    return this.http.get(this.url+"users");
  }

  updateUserStatus(objStatus: any, id_usuario: number){
    return this.http.put(this.url+"statusUser/"+id_usuario, objStatus);
  }

}
