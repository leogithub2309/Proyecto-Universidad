import { Component, OnInit } from '@angular/core';
import { IonInput, IonSelect, IonSelectOption, IonIcon, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-add-ventas',
  templateUrl: './add-ventas.component.html',
  styleUrls: ['./add-ventas.component.scss'],
  imports:[
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton
  ]
})
export class AddVentasComponent  implements OnInit {

  constructor() {
    addIcons({});
  }

  ngOnInit() {}

}
