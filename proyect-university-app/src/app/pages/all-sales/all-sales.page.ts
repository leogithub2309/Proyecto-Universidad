import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AllVentasComponent } from 'src/app/components/all-ventas/all-ventas.component';

@Component({
  selector: 'app-all-sales-pages',
  templateUrl: './all-sales.page.html',
  styleUrls: ['./all-sales.page.scss'],
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
    AllVentasComponent
  ]
})
export class AllSalesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
