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

  constructor() { }

  ngOnInit() {

    let id = String(sessionStorage.getItem("userIdSession"));

    this.apiVentasServices.getAllVentas(Number(id)).subscribe({
      next: (res: any) => {
        this.ventas.set(res.data);
      },
      error: (err) => console.error(err)
    })

  }

  formatVenta(fecha: string){
    const date = new Date(fecha);
    return `${date.getDate()} ${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
  }

}
