import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiComprasService {

  http = inject(HttpClient);

  private readonly url = "http://localhost:3000/";

  private readonly tasa = "https://pydolarve.org/api/v2/";

  constructor() { }


  getAllInventory(){
    return this.http.get(this.url+"inventory");
  }

  createNewSold(form: any, id_usuario: number){
    return this.http.post(this.url+"createCompra/"+id_usuario, form);
  }

  getCurrentCurrency(currency: string){
    //dollar?page=criptodolar&format_date=default&rounded_price=true
    return this.http.get(this.tasa+`${currency}?page=criptodolar&format_date=default&rounded_price=true`)
  }

}
