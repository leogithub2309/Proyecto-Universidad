import { Component, ElementRef, inject, OnInit, resource, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonSelect, IonSelectOption, IonIcon, IonTextarea, IonButton, ToastController,IonItem } from '@ionic/angular/standalone';
import e from 'cors';
import { addIcons } from 'ionicons';
import { ApiVentasService } from 'src/app/services/api-ventas.service';
import crypto from 'crypto-js';
import { VentasInterface } from 'src/app/model/ventas';
import { InventarioInterface } from 'src/app/model/inventario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ventas',
  templateUrl: './add-ventas.component.html',
  styleUrls: ['./add-ventas.component.scss'],
  imports:[
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonIcon,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddVentasComponent  implements OnInit {

  @ViewChild('foto_producto') foto_producto!: ElementRef;

  apiVentasService = inject(ApiVentasService);

  router = inject(Router);

  typeMoney = signal<any[]>([]);

  inventario = signal<any[]>([]);

  toastControllers = inject(ToastController);

  images!: File;

  fb = inject(FormBuilder);

  formVenta!:FormGroup;

  constructor() {
    addIcons({});
    this.formVenta = this.fb.group({
      venta_detalle: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      producto_detalle: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      titulo_producto: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      tipo_moneda: new FormControl('', [Validators.required]),
      monto_moneda: new FormControl('', [Validators.required, Validators.pattern(/^(\d+(\.\d+)?|\.\d+)$/)]),
      id_inventario: new FormControl('', [Validators.required]),
      cantidad_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/)]),
    });
  }

  ngOnInit() {
    this.apiVentasService.getTipoMoneda().subscribe({
      next: (res: any) => {
        this.typeMoney.set(res.data);
      },
      error: (err) => console.error(err)
    });

    this.apiVentasService.getAllInventory().subscribe({
      next: (res: any) => {
        this.inventario.set(res.data);
      },
      error: (err) => console.error(err)
    })
  }


  changeImagePreview(event: any){
    let path = "../../../assets/" + event.target.files[0].name || "http://localhost:80/uploaderImages/uploads/" + event.target.files[0].name;

    if(event.target.files[0]) this.foto_producto.nativeElement.src = path;
    
    else this.foto_producto.nativeElement.src = path;

    this.images = event.target.files[0];
  }

  async onSubmit(){

    const VENTA: VentasInterface = {
      venta_detalle: this.formVenta.get('venta_detalle')?.value,
      producto_detalle: this.formVenta.get('producto_detalle')?.value,
      titulo_producto: this.formVenta.get('titulo_producto')?.value,
      tipo_moneda: this.formVenta.get('tipo_moneda')?.value,
      monto_moneda: this.formVenta.get('monto_moneda')?.value,
      foto_producto: this.images.name,
      idUser: this.decripDataSession().userId,
      id_inventario: this.formVenta.get('id_inventario')?.value,
      cantidad_inventario: this.formVenta.get('cantidad_inventario')?.value
    }

    console.log(VENTA);

    // Agregar una nueva venta
    this.apiVentasService.createNewDetailsVenta(VENTA).subscribe({
      next: async (res: any) => {
        console.log(res);
        this.formVenta.reset();
          const toast = await this.toastControllers.create({
            message: res.description || "Se agregò un nuevo usuario correctamente",
            duration: 3000,
            color: "success",
            position:"bottom"
          });
          await toast.present();
      },
      error: async (err) => {

        this.formVenta.reset();
          const toast = await this.toastControllers.create({
            message: err.description || "Error, no se pudo agregar un nuevo usuario",
            duration: 3000,
            color: "success",
            position:"bottom"
          });
          await toast.present();
      }
    });

    // Agregar una nueva imagen
    if(this.images){
      const formData = new FormData();
      formData.append("foto_producto", this.images, this.images.name);
      formData.append('Content-Type','multipart/form-data');
      this.apiVentasService.uploadFiles(formData).subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
          this.foto_producto.nativeElement.src = "../../../assets/user-svgrepo-com.svg";
        }
      });
    }else{
       this.foto_producto.nativeElement.src = "../../../assets/user-svgrepo-com.svg";
    }

    //Reset de los campos del formulario.
    this.formVenta.reset(); 
    this.foto_producto.nativeElement.src = "../../../assets/user-svgrepo-com.svg";
    const toast = await this.toastControllers.create({
      message: "Se agregò una nueva venta correctamente",
      duration: 3000,
      color: "success",
      position:"bottom"
    });
    await toast.present();
    
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
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
