import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonInput, IonButton, IonIcon, IonTextarea, IonSelect, IonSelectOption, ToastController } from '@ionic/angular/standalone';
import { CompraInterface } from 'src/app/model/compras';
import { ApiComprasService } from 'src/app/services/api-compras.service';
import { ApiVentasService } from 'src/app/services/api-ventas.service';

@Component({
  selector: 'app-edit-single-compra',
  templateUrl: './edit-single-compra.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonIcon,
    IonTextarea,
    IonSelect,
    IonSelectOption
  ],
  styleUrls: ['./edit-single-compra.component.scss'],
})
export class EditSingleCompraComponent  implements OnInit {

  editComprasForm: FormGroup;
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  image!: File;
  customModalOptions = {
    header: 'Lista de Inventario',
    breakpoints: [0, 0.45],
    initialBreakpoint: 0.65,
  };
  @ViewChild ('foto_producto') foto_producto!: ElementRef;
  inventory = signal<any[]>([]);
  monedaCompras = signal<any[]>([]);
  comprasData = signal<CompraInterface[]>([]);
  apiComprasService = inject(ApiComprasService);
  apiVentasService = inject(ApiVentasService);
  toastController = inject(ToastController);

  constructor() {
    this.editComprasForm = this.fb.group({
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

    console.log(this.activatedRoute.snapshot.params['id']);

    this.apiComprasService.getSingleCompra(Number(this.activatedRoute.snapshot.params['id'])).subscribe({
      next: (response: any) => {
          this.comprasData.set(response.data);
          this.editComprasForm.patchValue({
            compra_detalle: this.comprasData()[0].compra_detalle,
            producto_detalle: this.comprasData()[0].producto_detalle,
            titulo_producto: this.comprasData()[0].titulo_producto,
            tipo_moneda: this.comprasData()[0].moneda,
            monto_moneda: this.comprasData()[0].monto_moneda,
            id_inventario: this.comprasData()[0].id_inventario,
            cantidad_inventario: ''
          });
          this.foto_producto.nativeElement.src = "../assets/" +this.comprasData()[0].foto_producto;
      },
      error: (err) => console.error(err)
    });


    this.apiVentasService.getTipoMoneda().subscribe({
      next: (response: any) => {
        this.monedaCompras.set(response.data);
      },
      error: (err) => console.error(err)
    })

    this.apiComprasService.getAllInventory().subscribe({
      next: (response: any) => {
        this.inventory.set(response.data);
      },
      error: (err) => console.error(err)
    })

  }

  
  onEditComprasForm(){

    const COMPRAS: CompraInterface = {
      compra_detalle: this.editComprasForm.get('compra_detalle')?.value,
      producto_detalle: this.editComprasForm.get('producto_detalle')?.value,
      titulo_producto: this.editComprasForm.get('titulo_producto')?.value,
      moneda: this.editComprasForm.get('tipo_moneda')?.value,
      monto_moneda: this.editComprasForm.get('monto_moneda')?.value,
      id_inventario: this.editComprasForm.get('id_inventario')?.value,
      cantidad_inventario: this.editComprasForm.get('cantidad_inventario')?.value,
      id_moneda: this.comprasData()[0].id_moneda,
      id_producto: this.comprasData()[0].id_producto,
      foto_producto: this.comprasData()[0].foto_producto === undefined ? this.image.name : this.comprasData()[0].foto_producto,
      id_compras: this.activatedRoute.snapshot.params['id']
    }

    this.apiComprasService.updataCompra(COMPRAS, Number(COMPRAS.id_compras)).subscribe({
      next: async (response) => {
        const toast = await this.toastController.create({
          message: response.description || "La compra se actualizo correctamente.",
          duration: 3000,
          color: "success",
          position:"bottom"
        });
        await toast.present();
      },
      error: async (err) => {
        console.error(err);
        const toast = await this.toastController.create({
          message: err.description || "Error, no se pudo actualizar la compra.",
          duration: 3000,
          color: "danger",
          position:"bottom"
        });
        await toast.present();
      }
    });


  }


  changeImagePreview(event: any){
    this.image = event.target.files[0];
  }

}
