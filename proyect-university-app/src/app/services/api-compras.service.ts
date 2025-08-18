import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompraInterface } from '../model/compras';
import { Observable } from 'rxjs';
import { Response } from '../model/response';

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

  createNewSold(form: any, id: number){
    return this.http.post(this.url+"compra/"+id, form);
  }

  getCurrentCurrency(currency: string){
    //dollar?page=criptodolar&format_date=default&rounded_price=true
    return this.http.get(this.tasa+`${currency}`);
  }

  getAllCompras(id: number){
    return this.http.get(this.url+"AllCompras/"+id);
  }

  getSingleCompra(id: number){
    return this.http.get(this.url+"compraDetalle/"+id);
  }

  getDataChart(id: number){
    return this.http.get(this.url+"dataChart/"+id);
  }

  createInventory(form: any){
    return this.http.post(this.url+"createInventory", form);
  }

  updataCompra(form: CompraInterface, id: number): Observable<any>{
    return this.http.put(this.url+"updateCompra/"+id, form);
  }

  deleteCompra(id: number){
    return this.http.delete(this.url+"deleteCompra/"+id);
  }

}
