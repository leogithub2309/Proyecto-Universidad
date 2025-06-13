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
  IonIcon, } from '@ionic/angular/standalone';
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
          console.log(this.inventory());
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

    console.log(COMPRAS);

    this.apiComprasService.createNewSold(COMPRAS, userId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.error(err)
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
