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
  @ViewChild('foto_producto') foto_producto!: ElementRef;
  inventarioService = inject(InventarioService);
  toastControllers = inject(ToastController);
  images!: File;

  constructor() {

    this.formInventario = this.fb.group({
      producto_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      foto_producto_inventario: new FormControl('', [Validators.required]),
      cantidad_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/)]),
      precio_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/)]),
      id_usuario: new FormControl('')
    });
  }

  ngOnInit() {}

  onAddIventory(){

    const INVENTARIO: InventarioInterface = {
      producto_inventario: this.formInventario.get('producto_inventario')?.value,
      cantidad_inventario: this.formInventario.get('cantidad_inventario')?.value,
      foto_producto_inventario: this.images.name,
      precio_inventario: this.formInventario.get("precio_inventario")?.value,
      id_usuario: this.decripDataSession().userId
    }

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

    let path = "../../../assets/" + event.target.files[0].name;

    if(event.target.files[0]) this.foto_producto.nativeElement.src = path;
    
    else this.foto_producto.nativeElement.src = path;

    this.images = event.target.files[0];
  }

  decripDataSession(){

    let separate = String(sessionStorage.getItem("tokenUserSession")).split(".");

    const encrypt = window.atob(separate[1]),
      objectParse = JSON.parse(encrypt);

    return {
      user: objectParse.user,
      rol: objectParse.rol,
      userId : objectParse.userId
    }

  }

}
