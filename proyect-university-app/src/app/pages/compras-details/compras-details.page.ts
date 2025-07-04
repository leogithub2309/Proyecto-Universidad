import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton, IonIcon, IonModal } from '@ionic/angular/standalone';
import { CompraInterface } from 'src/app/model/compras';
import { ApiComprasService } from 'src/app/services/api-compras.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-compras-details',
  templateUrl: './compras-details.page.html',
  styleUrls: ['./compras-details.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButton,
    IonIcon,
    IonBackButton, 
    IonButtons,
    IonModal,
    CommonModule, 
    FormsModule,
    RouterLink
  ]
})
export class ComprasDetailsPage implements OnInit {

  singleCompra = signal<any>([]);
  apiCompraServices = inject(ApiComprasService);
  currency = signal<number>(0);
  id = inject(ActivatedRoute);
  _router = inject(Router)

  constructor() { }

  ngOnInit() {

    this.apiCompraServices.getSingleCompra(this.id.snapshot.params['id']).subscribe({
      next: (res: any) => {
        console.log(res);
        this.singleCompra.set(res.data[0]);
      },
      error: (err) => console.error(err)
    });

    this.apiCompraServices.getCurrentCurrency("dollar").subscribe({
      next: (res: any) => {
        this.currency.set(res.monitors.bcv.price);
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

  deleteCompra(){
    this.apiCompraServices.deleteCompra(this.id.snapshot.params['id']).subscribe({
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
