import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private readonly url = "http://localhost:3000/";

  http = inject(HttpClient);

  constructor() { }

  createInventory(form: any){
    return this.http.post(this.url+"createInventory", form);
  }
}
