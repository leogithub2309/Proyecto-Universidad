import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Ventas } from 'src/app/model/response';
import { EditSingleVentaComponent } from 'src/app/components/edit-single-venta/edit-single-venta.component';
import { ApiVentasService } from 'src/app/services/api-ventas.service';

@Component({
  selector: 'app-edit-venta',
  templateUrl: './edit-venta.page.html',
  styleUrls: ['./edit-venta.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonBackButton, 
    IonButtons, 
    CommonModule, 
    FormsModule, 
    EditSingleVentaComponent
  ]
})
export class EditVentaPage implements OnInit {

  id = inject(ActivatedRoute);
  venta = signal<Ventas[]>([]);
  currency = signal<number>(125.17);
  apiVentasService = inject(ApiVentasService);

  constructor() { }

  ngOnInit() {
    
  }

}
