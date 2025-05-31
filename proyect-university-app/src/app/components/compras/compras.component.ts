import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonNote, IonSelect, IonSelectOption, IonText } from '@ionic/angular/standalone';
import { Ventas } from 'src/app/model/response';
import { ApiVentasService } from 'src/app/services/api-ventas.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  imports: [
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    IonButton,
    IonText,
    IonNote,
    IonSelect,
    IonSelectOption,
    RouterLink
  ],
  styleUrls: ['./compras.component.scss'],
})
export class ComprasComponent  implements OnInit {

  moneda = signal<any[]>([]);
  compras = signal<any[]>([]);
  totalCompras: number = 0;
  currency = signal<number>(0);

  apiVentasServices = inject(ApiVentasService);

  constructor() { }

  ngOnInit() {
     this.apiVentasServices.getTipoMoneda().subscribe({
      next: (res: any) => {
        this.moneda.set(res.data);
      },
      error: (err) => console.error(err)
    })
  }

  getCurrency(event: any){
  
      let currency = event.target.value === "bolívares" ? "dollar" : event.target.value,
        convertion = 0;
  
      this.totalCompras = 0;
  
      this.apiVentasServices.getCurrentCurrency(currency).subscribe({
        next: (res: any) => {
          this.currency.set(res.monitors.bcv.price);
          this.compras().forEach((value: Ventas) => {
            if(value.moneda === "$"){
              convertion = this.currency() * Number(value.monto_moneda);
              this.totalCompras += convertion;
            }else if(value.moneda === "€"){
              convertion = this.currency() * Number(value.monto_moneda);
              this.totalCompras += convertion;
            }else if(value.moneda === "Bs") this.totalCompras += Number(value.monto_moneda);
          });
  
          this.totalCompras = this.totalCompras / this.currency();
        },
        error: (err) => console.error(err)
      });
  }

  formatVenta(fecha: string){
    const date = new Date(fecha);
    return `${date.getDate()},${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
  }

}
