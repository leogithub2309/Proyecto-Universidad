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
  titleCompra: string = 'Bs';
  monitors = 200;
  compraCurrency = signal<CompraInterface[]>([]);

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
        
        this.compraCurrency.set(res.data);
        
        this.getTotalBs(res.data);
      },
      error: (err) => console.error(err)
    });

    
  }

  getCurrency(event: any){
    console.log(event.target.value)
    let currency = event.target.value, 
      convertion = 0;
      
    this.currency.set(0);
    this.totalCompras = 0;
      
    this.currency.set(this.monitors);
          
    this.compraCurrency().forEach((value: CompraInterface) => {
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

    if(currency === "euro"){
      this.currency.set(this.monitors + 30);
      this.totalCompras = this.totalCompras / this.currency();
        
    } else this.totalCompras = this.totalCompras / this.currency();

    if(currency === "bolívares"){
      this.totalCompras = this.totalCompras * this.currency();
      this.titleCompra = "Bs";
    }

    this.titleCompra = currency === "dollar" ? "$" : currency === "euro" ? "€" : currency === "bolívares" ? 'Bs' : '';
  }

  getTotalBs(data: any){

    let convertion = 0;

    this.totalCompras = 0;
        
    this.currency.set(this.monitors);
        
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

  }

  formatVenta(fecha: any){
    const date = new Date(fecha);
    return `${date.getDate()} ${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
  }

}
