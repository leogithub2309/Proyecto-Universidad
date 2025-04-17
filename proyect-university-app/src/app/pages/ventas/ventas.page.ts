import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AddVentasComponent } from "../../components/add-ventas/add-ventas.component";

@Component({
  selector: 'app-ventas-pages',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    AddVentasComponent,
    IonBackButton,
    IonButtons
  ]
})
export class VentasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
