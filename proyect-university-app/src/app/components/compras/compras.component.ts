import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonNote, IonSelect, IonSelectOption, IonText } from '@ionic/angular/standalone';
import { CompraInterface, Compras } from 'src/app/model/compras';
import { Ventas } from 'src/app/model/response';
import { ApiComprasService } from 'src/app/services/api-compras.service';
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
  comprasData = signal<CompraInterface[]>([]);
  totalCompras: number = 0;
  currency = signal<number>(0);
  symbol = signal<string>('Bs');

  apiVentasServices = inject(ApiVentasService);
  apiComprasServices = inject(ApiComprasService);

  constructor() { }

  ngOnInit() {

    let id = String(sessionStorage.getItem("userIdSession"));

     this.apiVentasServices.getTipoMoneda().subscribe({
      next: (res: any) => {
        this.moneda.set(res.data);
      },
      error: (err) => console.error(err)
    })

    this.apiComprasServices.getAllCompras(Number(id)).subscribe({
      next: (res: any) => {
        for(let i=0; i<5; i++){
            if(res.data[i]) this.comprasData().push(res.data[i]);
        }
        this.getTotalBs(res.data);
      },
      error: (err) => console.error(err)
    })

    
  }

  getCurrency(event: any){
  
      let currency = (event.target.value === "dollar" || event.target.value === "bolívares") ? "dollar" : "euro", 
      convertion = 0;
  
      this.totalCompras = 0;
  
      this.apiVentasServices.getCurrentCurrency(currency).subscribe({
        next: (res: any) => {
          this.currency.set(Object.keys(res.monitors).length === 0 ? 110.52 : res.monitors.bcv.price);
          this.comprasData().forEach((value: CompraInterface) => {
            if(value.moneda === "$"){
              convertion = this.currency() * Number(value.monto_moneda);
              this.totalCompras += convertion;
            }else if(value.moneda === "€"){
              convertion = this.currency() * Number(value.monto_moneda);
              this.totalCompras += convertion;
            }else if(value.moneda === "Bs"){
              this.totalCompras += Number(value.monto_moneda);
            }
          });

          this.totalCompras = this.totalCompras / this.currency();

          if(event.target.value === "bolívares"){
            this.totalCompras = this.totalCompras * this.currency();
            this.symbol.set("Bs");
          }
          
          this.symbol.set(currency === "dollar" ? "$" : currency === "euro" ? "€" : currency === "bolívares" ? 'Bs' : '');
        },
        error: (err) => console.error(err)
      });
  }

  getTotalBs(data: any){

    let convertion = 0;

    this.apiComprasServices.getCurrentCurrency("dollar").subscribe({
      next: (res: any) => {
        this.currency.set(Object.keys(res.monitors).length === 0 ? 110.52 : res.monitors.bcv.price);
        data.forEach((value: Ventas) => {
          if(value.moneda === "$"){
            convertion = this.currency() * Number(value.monto_moneda);
            this.totalCompras += convertion;
          }else if(value.moneda === "€"){
            convertion = this.currency() * Number(value.monto_moneda);
            this.totalCompras += convertion;
          }else if(value.moneda === "Bs"){
            this.totalCompras += Number(value.monto_moneda);
          }
        });
      },
      error: (err) => console.error(err)
    });

  }

  formatVenta(fecha: string){
    const date = new Date(fecha);
    return `${date.getDate()} ${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
  }

}
