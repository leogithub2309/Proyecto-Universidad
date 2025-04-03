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

}
