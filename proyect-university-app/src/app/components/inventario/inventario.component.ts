import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  imports: [
    IonButton,
    IonInput,
    ReactiveFormsModule
  ],
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent  implements OnInit {

  formInventario!: FormGroup;
  fb = inject(FormBuilder);
   @ViewChild('prevImage') foto_producto!: ElementRef;

  constructor() {

    this.formInventario = this.fb.group({
      producto_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      foto_producto_inventario: new FormControl('', [Validators.required]),
      cantidad_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/)])
    });
  }

  ngOnInit() {}

}
