
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VentasInterface } from '../model/ventas';

@Injectable({
  providedIn: 'root'
})
export class ApiVentasService {

  private http = inject(HttpClient);

  private readonly url = "http://localhost:3000/";

  private readonly tasa = "https://pydolarve.org/api/v2/";

  getTipoMoneda(){
    return this.http.get(this.url+"tipoMoneda");
  }

  uploadFiles(file: any){
    let headers=new HttpHeaders().set('Content-Type','multipart/form-data');
    return this.http.post("http://localhost:80/uploaderImages/uploadImages.php", JSON.stringify(file));
  }

  getRolUser(rol: number){
    return this.http.get(this.url+"/rolesUser/"+rol);
  }

  createNewDetailsVenta(venta: VentasInterface){
    return this.http.post(this.url+"createVenta/"+venta.idUser, venta);
  }

  getFirstVentas(){
    return this.http.get(this.url+"firstVentas");
  }

  getCurrentCurrency(currency: string){
    //dollar?page=criptodolar&format_date=default&rounded_price=true
    return this.http.get(this.tasa+`${currency}?page=criptodolar&format_date=default&rounded_price=true`)
  }

  getAllVentas(id: number){
    return this.http.get(this.url+"allVentas/"+id);
  }

  getSingeVenta(id: number){
    return this.http.get(this.url+"venta/"+id);
  }

  getAllInventory(){
    return this.http.get(this.url+"inventory");
  }

  updateVenta(form: VentasInterface, id:number){
    return this.http.put(this.url+"updateVenta/"+id, form);
  }

   deleteVenta(id: number){
    return this.http.delete(this.url+"deleteVenta/"+id);
  }

}
