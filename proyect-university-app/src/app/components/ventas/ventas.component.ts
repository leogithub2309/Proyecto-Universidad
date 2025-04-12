import { Component, OnInit } from '@angular/core';
import { IonItem, IonList, IonLabel, IonIcon, IonButton, IonText, IonNote } from '@ionic/angular/standalone';

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
    IonNote
  ]
})
export class VentasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
