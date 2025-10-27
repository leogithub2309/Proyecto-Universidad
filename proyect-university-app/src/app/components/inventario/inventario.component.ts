import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';
import { InventarioInterface } from 'src/app/model/inventario';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  imports: [
    IonButton,
    IonInput,
    IonIcon,
    ReactiveFormsModule
  ],
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent  implements OnInit {

  formInventario!: FormGroup;
  fb = inject(FormBuilder);
  @ViewChild('prevImage') foto_producto!: ElementRef;
  inventarioService = inject(InventarioService);
  toastControllers = inject(ToastController);
  images!: File;

  constructor() {

    this.formInventario = this.fb.group({
      producto_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      foto_producto_inventario: new FormControl('', [Validators.required]),
      cantidad_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/)]),
      precio_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/)])
    });
  }

  ngOnInit() {}

  onAddIventory(){

    const INVENTARIO: InventarioInterface = {
      producto_inventario: this.formInventario.get('producto_inventario')?.value,
      cantidad_inventario: this.formInventario.get('cantidad_inventario')?.value,
      foto_producto_inventario: this.images.name,
      precio_inventario: this.formInventario.get("precio_inventario")?.value
    }

    console.log(INVENTARIO);

    this.inventarioService.createInventory(INVENTARIO).subscribe({
      next: async (response: any) => {
        console.log(response);
        const toast = await this.toastControllers.create({
            message: response.description || "Se añadió un nuevo producto al inventario",
            duration: 3000,
            color: "success",
            position:"bottom"
          });
          await toast.present();
          this.formInventario.reset();
      },
      error: async (err) => {
        console.error(err);
        const toast = await this.toastControllers.create({
            message: err.description || "Error, no se pudo agregar el nuevo producto al inventario",
            duration: 3000,
            color: "danger",
            position:"bottom"
          });
          await toast.present();
      }
    });
  }

  changeImagePreview(event: any){

    this.images = event.target.files[0];
  }

}
