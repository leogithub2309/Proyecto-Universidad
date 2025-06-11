import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { AddComprasComponent } from '../../components/add-compras/add-compras.component';


@Component({
  selector: 'app-compras-pages',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule,
    AddComprasComponent,
    FormsModule,
    IonBackButton,
    IonButtons
  ]
})
export class ComprasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
