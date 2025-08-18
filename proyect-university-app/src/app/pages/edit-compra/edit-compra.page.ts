import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { EditSingleCompraComponent } from "src/app/components/edit-single-compra/edit-single-compra.component";

@Component({
  selector: 'app-edit-compra',
  templateUrl: './edit-compra.page.html',
  styleUrls: ['./edit-compra.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    EditSingleCompraComponent, 
    IonButtons, 
    IonBackButton
  ]
})
export class EditCompraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
