
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VentasInterface } from '../model/ventas';

@Injectable({
  providedIn: 'root'
})
export class ApiVentasService {

  private http = inject(HttpClient);

  readonly url = "http://localhost:3000/";

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

}
