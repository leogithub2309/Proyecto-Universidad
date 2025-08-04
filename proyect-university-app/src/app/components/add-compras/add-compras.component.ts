import { Component, OnInit, inject, ElementRef, ViewChild, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonBackButton, 
  IonButtons, 
  IonItem, 
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';
import { ApiVentasService } from 'src/app/services/api-ventas.service';
import { ApiComprasService } from 'src/app/services/api-compras.service';
import { InventarioInterface } from 'src/app/model/inventario';
import { Compras } from 'src/app/model/compras';

@Component({
  selector: 'app-add-compras',
  templateUrl: './add-compras.component.html',
  imports: [
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonIcon,
    ReactiveFormsModule

  ],
  styleUrls: ['./add-compras.component.scss'],
})
export class AddComprasComponent  implements OnInit {

  fb = inject(FormBuilder);
  images!: File;
  comprasForm!: FormGroup;
  @ViewChild('foto_producto') foto_producto!: ElementRef;
  monedaCompras = signal<any[]>([]);
  apiVentasService = inject(ApiVentasService);
  apiComprasService = inject(ApiComprasService);
  inventory = signal<InventarioInterface[]>([]);
  toastControllers = inject(ToastController);
  compras = signal<Compras[]>([]);
  customModalOptions = {
    header: 'Lista de Inventario',
    breakpoints: [0, 0.5],
    initialBreakpoint: 0.5,
  };

  constructor() {

    this.comprasForm = this.fb.group({
      compra_detalle: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      producto_detalle: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      titulo_producto: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      tipo_moneda: new FormControl('', [Validators.required]),
      monto_moneda: new FormControl('', [Validators.required,Validators.pattern(/^(\d+(\.\d+)?|\.\d+)$/)]),
      id_inventario: new FormControl('', [Validators.required]),
      cantidad_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/)]),
    });
  }

  ngOnInit() {

    this.apiVentasService.getTipoMoneda().subscribe({
      next: (res: any) => {
        this.monedaCompras.set(res.data);
      },
      error: (err) => console.error(err)
    });

    this.apiComprasService.getAllInventory().subscribe({
      next: (response: any) => {
          this.inventory.set(response.data);
      },
      error: (err) => console.error(err)
    });

  }

  onSubmitCompras(){

    let userId = this.decripDataSession().userId;

    const COMPRAS: Compras = {
      compra_detalle: this.comprasForm.get('compra_detalle')?.value,
      producto_detalle: this.comprasForm.get('producto_detalle')?.value,
      titulo_producto: this.comprasForm.get('titulo_producto')?.value,
      tipo_moneda: this.comprasForm.get('tipo_moneda')?.value,
      monto_moneda: Number(this.comprasForm.get('monto_moneda')?.value),
      id_inventario: Number(this.comprasForm.get('id_inventario')?.value),
      cantidad_inventario: Number(this.comprasForm.get('cantidad_inventario')?.value),
      foto_producto: this.images.name,
    }

    this.apiComprasService.createNewSold(COMPRAS, userId).subscribe({
      next: async (res: any) => {
        console.log(res);
         const toast = await this.toastControllers.create({
            message: res.description || "Se agregó una nueva compra correctamente",
            duration: 3000,
            color: "success",
            position:"bottom"
          });
          await toast.present();
          this.comprasForm.reset();
      },
      error: async (err) => {
        console.error(err);
        const toast = await this.toastControllers.create({
            message: err.description || "Error, no se pudo agregar una nueva compra",
            duration: 3000,
            color: "danger",
            position:"bottom"
          });
          await toast.present();
      }
    });

  }


  changeImagePreview(event: any){
    let path = "../../../assets/" + event.target.files[0].name || "http://localhost:80/uploaderImages/uploads/" + event.target.files[0].name;

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
