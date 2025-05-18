import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonItem, IonList, IonLabel, IonIcon, IonButton, IonText, IonNote } from '@ionic/angular/standalone';
import { Ventas } from 'src/app/model/response';
import { ApiVentasService } from 'src/app/services/api-ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  imports: [
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    IonButton,
    IonText,
    IonNote,
    RouterLink
  ]
})
export class VentasComponent  implements OnInit {

  apiVentasServices = inject(ApiVentasService);

  ventas = signal<Ventas[]>([]);

  totalVentas: number = 0;

  constructor() { }

  ngOnInit(){
    this.apiVentasServices.getFirstVentas().subscribe({
      next: (res: any) => {
        this.ventas.set(res.data);
        this.getToalBs(res.data);
      },
      error: (err) => console.error(err)
    })
  }

  formatVenta(fecha: string){
    const date = new Date(fecha);
    return `${date.getDate()},${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
  }


  getToalBs(data: any){
    const totalVentasData = data.filter((data: Ventas) => data.moneda === "Bs");
    
    totalVentasData.forEach((value: Ventas) => {
      this.totalVentas += Number(value.monto_moneda);
    });

    console.log(this.totalVentas);
  }

}
