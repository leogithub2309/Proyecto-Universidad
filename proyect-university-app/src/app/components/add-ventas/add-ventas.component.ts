import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    IonButton,
    IonIcon,
  ]
})
export class AddVentasComponent  implements OnInit {

  @ViewChild('previewImage') previewImage!: ElementRef;

  constructor() {
    addIcons({});
  }

  ngOnInit() {}

}
