import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InventarioComponent } from 'src/app/components/inventario/inventario.component';

@Component({
  selector: 'app-add-inventario',
  templateUrl: './add-inventario.page.html',
  styleUrls: ['./add-inventario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, InventarioComponent]
})
export class AddInventarioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
