import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonBackButton, IonButtons, IonButton, IonIcon, IonModal } from '@ionic/angular/standalone';
import { ApiVentasService } from 'src/app/services/api-ventas.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ventas-details-page',
  templateUrl: './ventas-details.page.html',
  styleUrls: ['./ventas-details.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButton,
    IonIcon,
    IonModal,
    CommonModule, 
    FormsModule,
    IonBackButton, 
    IonButtons,
    RouterLink
  ]
})
export class VentasDetailsPage implements OnInit {

  apiVentasServices = inject(ApiVentasService);
  id = inject(ActivatedRoute);
  singleVenta = signal<any>([]);
  currency = signal<number>(125.17);
  _router = inject(Router);
  idRouter: number = 0;

  constructor() {}

  ngOnInit() {

    this.idRouter = Number(this.id.snapshot.params['id']);

    this.apiVentasServices.getSingeVenta(Number(this.id.snapshot.params["id"])).subscribe({
      next: (response: any) => {
        this.singleVenta.set(...[response.data[0]]);
      },
      error: (err) => console.error(err)
    });

    this.apiVentasServices.getCurrentCurrency("dollar").subscribe({
      next: (res: any) => {
        this.currency.set(Object.keys(res.monitors).length === 0 ? 125.17 : res.monitors.bcv.price);
      },
      error: (err) => console.error(err)
    })

  }

  formatVenta(fecha: string){
    const date = new Date(fecha);
    return `${date.toLocaleString()}`;
  }

  detailsPrices(prices: string, type: string){
    let parsePrices = Number(prices);
    return type === "Bolívares" 
    ? (parsePrices / this.currency()).toFixed(2)
    : type === "Dollar" 
    ? (parsePrices * this.currency()).toFixed(2) 
    : parsePrices+".00";
  }

  deleteVenta(){
    this.apiVentasServices.deleteVenta(this.id.snapshot.params['id']).subscribe({
      next: (response) => {
        this._router.navigate(['/dashboard']);
      },
      error: (err) => console.error(err)
    })
  }

  async canDismiss(data?: undefined, role?: string) {
    return role !== 'gesture';
  }

}
