import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonBackButton, IonButtons, IonItem, IonList, IonLabel, IonIcon, IonButton, IonText, IonNote, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Ventas } from 'src/app/model/response';
import { ApiVentasService } from 'src/app/services/api-ventas.service';

@Component({
  selector: 'app-all-ventas',
  templateUrl: './all-ventas.component.html',
  imports:[
    IonItem,
    IonList,
    IonLabel,
    IonText,
    IonNote,
    RouterLink
  ],
  styleUrls: ['./all-ventas.component.scss'],
})
export class AllVentasComponent  implements OnInit {

  apiVentasServices = inject(ApiVentasService);

  ventas = signal<Ventas[]>([]);

  id: string = "";

  constructor() { }

  ngOnInit() {

    this.id = String(sessionStorage.getItem("userIdSession"));

    this.apiVentasServices.getAllVentas(Number(this.id)).subscribe({
      next: (res: any) => {
        this.ventas.set(res.data);
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
