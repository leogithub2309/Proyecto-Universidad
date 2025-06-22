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
    this.apiComprasServices.getAllCompras().subscribe({
      next: (res: any) => {
        this.compras.set(res.data);
      },
      error: (err) => console.error(err)
    })
  }




  formatVenta(fecha: string){
    const date = new Date(fecha);
    return `${date.getDate()} ${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
  }

}
