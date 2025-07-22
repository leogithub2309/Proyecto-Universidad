import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonItem,
  IonList,
  IonLabel,
  IonText,
  IonNote,
} from '@ionic/angular/standalone';
import { CompraInterface } from 'src/app/model/compras';
import { ApiComprasService } from 'src/app/services/api-compras.service';

@Component({
  selector: 'app-all-sold',
  templateUrl: './all-sold.component.html',
  imports: [
    IonItem,
    IonList,
    IonLabel,
    IonText,
    IonNote,
    RouterLink
  ],
  styleUrls: ['./all-sold.component.scss'],
})
export class AllSoldComponent  implements OnInit {

  compras = signal<CompraInterface[]>([]);
  apiComprasServices = inject(ApiComprasService);

  constructor() { }

  ngOnInit() {
    let id = String(sessionStorage.getItem("userIdSession"));
    this.apiComprasServices.getAllCompras(Number(id)).subscribe({
      next: (res: any) => {
        this.compras.set(res.data);
      },
      error: (err) => console.error(err)
    })
  }

  searchData(event: any){
    
    const items: NodeListOf<Element> = document.querySelectorAll("ion-list .ion-list-items");

    items.forEach((ionList) => {
      
      let tituloProducto = ionList.querySelector(".titulo_producto strong"),
        fecha = ionList.querySelector("ion-note"),
        textFecha = fecha?.textContent?.split(" ")[2];

      if(tituloProducto?.textContent?.toLowerCase().includes(event.target.value.toLowerCase()) || textFecha?.toLowerCase().includes(event.target.value.toLowerCase())){
        ionList.classList.remove("hidden");
      }else{
        ionList.classList.add("hidden");
      }

    });
  }

  formatVenta(fecha: string){
    const date = new Date(fecha);
    return `${date.getDate()} ${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
  }

}
