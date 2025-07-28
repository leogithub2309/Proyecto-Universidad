import { Component, inject, OnInit, signal } from '@angular/core';
import { c } from '@angular/core/event_dispatcher.d-pVP0-wST';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonItem, IonList, IonLabel, IonIcon, IonButton, IonText, IonNote, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
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
    IonSelect,
    IonSelectOption,
    RouterLink,
    FormsModule
  ]
})
export class VentasComponent  implements OnInit {

  apiVentasServices = inject(ApiVentasService);
  ventas = signal<Ventas[]>([]);
  moneda = signal<any[]>([]);
  currency = signal<number>(125.17);
  totalVentas: number = 0;
  titleVenta: string = "Bs";
  monitors = 125.17;

  constructor() { }

  ngOnInit(){

    let id = String(sessionStorage.getItem("userIdSession"));

    this.apiVentasServices.getAllVentas(Number(id)).subscribe({
      next: (res: any) => {

        for(let i=0; i<5; i++){
            if(res.data[i]) this.ventas().push(res.data[i]);
        }

        //this.ventas.update(() => res.data);
   
        this.getToalBs(res.data);
      },
      error: (err) => console.error(err)
    });

    this.apiVentasServices.getTipoMoneda().subscribe({
      next: (res: any) => {
        this.moneda.set(res.data);
      },
      error: (err) => console.error(err)
    })

  }

  formatVenta(fecha: string){
    const date = new Date(fecha);
    return `${date.getDate()} ${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
  }


  getToalBs(data: any){

    let convertion = 0;

    this.apiVentasServices.getCurrentCurrency("dollar").subscribe({
      next: (res: any) => {
        
        this.totalVentas = 0;
        
        this.currency.set(Object.keys(res.monitors).length === 0 ? this.monitors : res.monitors.bcv.price);
        
        data.forEach((value: Ventas) => {
          if(value.moneda === "$"){
            convertion = this.currency() * Number(value.monto_moneda);
            this.totalVentas += convertion;
          }else if(value.moneda === "€"){
            convertion = this.currency() * Number(value.monto_moneda);
            this.totalVentas += convertion;
          }else if(value.moneda === "Bs") this.totalVentas += Number(value.monto_moneda);
        });
      },
      error: (err) => console.error(err)
    });

  }

  getCurrency(event: any){

    let currency = event.target.value === "bolívares" ? "dollar" : event.target.value,
      convertion = 0;

    
    this.currency.set(0);

    this.apiVentasServices.getCurrentCurrency(currency).subscribe({
      next: (res: any) => {
        
        this.totalVentas = 0;
        
        this.currency.set(Object.keys(res.monitors).length === 0 ? this.monitors : res.monitors.bcv.price);
        
        this.ventas().forEach((value: Ventas) => {
          if(value.moneda === "$"){
            convertion = this.currency() * Number(value.monto_moneda);
            this.totalVentas += convertion;
          }else if(value.moneda === "€"){
            convertion = this.currency() * Number(value.monto_moneda);
            this.totalVentas += convertion;
          }else if(value.moneda === "Bs") this.totalVentas += Number(value.monto_moneda);
        });

        this.totalVentas = this.totalVentas / this.currency();

        if(event.target.value === "bolívares"){
          this.totalVentas = this.totalVentas * this.currency();
          this.titleVenta = "Bs";
        }

        if(event.target.value === "euro") this.monitors = 140.00;

      },
      error: (err) => console.error(err)
    });

    this.titleVenta = currency === "dollar" ? "$" : currency === "euro" ? "€" : currency === "bolívares" ? 'Bs' : '';
    
  }

  getTodayCurrency(tipoMoneda: string, monto: number){

    this.titleVenta = tipoMoneda === "dollar" ? "$" : tipoMoneda === "euro" ? "€" : tipoMoneda === "bolívares" ? 'Bs' : '';
    
    let formatCurrency = `${(monto / this.currency()).toFixed(2)}`;
    
    return formatCurrency;
  }

  

}
