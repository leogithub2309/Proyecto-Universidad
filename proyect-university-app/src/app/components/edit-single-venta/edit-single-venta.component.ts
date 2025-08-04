import { CommonModule } from '@angular/common';
import { Component, inject, signal ,OnInit, input, computed, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonButton, IonIcon, IonInput, IonSelect, IonSelectOption, IonTextarea } from '@ionic/angular/standalone';
import { InventarioInterface } from 'src/app/model/inventario';
import { Ventas } from 'src/app/model/response';
import { ApiVentasService } from 'src/app/services/api-ventas.service';

@Component({
  selector: 'app-edit-single-venta',
  templateUrl: './edit-single-venta.component.html',
  imports: [
    CommonModule,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonIcon,
    ReactiveFormsModule
  ],
  styleUrls: ['./edit-single-venta.component.scss'],
})
export class EditSingleVentaComponent  implements OnInit {

  editComprasForm: FormGroup;
  fb = inject(FormBuilder);
  apiVentasService = inject(ApiVentasService);
  activeRouter = inject(ActivatedRoute);
  monedaVenta = signal<any>([]);
  inventory = signal<InventarioInterface[]>([]);
  image!: File;
  venta = signal<Ventas[]>([]);
  labelVenta = computed(() => this.venta());
  @ViewChild ('foto_producto') foto_producto!: ElementRef;
  customModalOptions = {
    header: 'Lista de Inventario',
    breakpoints: [0, 0.5],
    initialBreakpoint: 0.5,
  };

  constructor(){
    this.editComprasForm = this.fb.group({
      venta_detalle: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      producto_detalle: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      titulo_producto: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]/)]),
      tipo_moneda: new FormControl('', [Validators.required]),
      monto_moneda: new FormControl('', [Validators.required,Validators.pattern(/^(\d+(\.\d+)?|\.\d+)$/)]),
      id_inventario: new FormControl('', [Validators.required]),
      cantidad_inventario: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]/)]),
    });
  }

  ngOnInit() {
    
    this.apiVentasService.getSingeVenta(Number(this.activeRouter.snapshot.params['id'])).subscribe({
      next: (response: any) => {
        this.venta.set(response.data);
        console.log(this.venta());
        this.editComprasForm.patchValue({
          venta_detalle: this.venta()[0].venta_detalle,
          producto_detalle: this.venta()[0].producto_detalle,
          titulo_producto: this.venta()[0].titulo_producto,
          tipo_moneda: this.venta()[0].moneda,
          monto_moneda: this.venta()[0].monto_moneda,
          id_inventario: this.venta()[0].id_producto,
          cantidad_inventario: this.venta()[0].cantidad_inventario
        });
        this.foto_producto.nativeElement.src = "../assets/" +this.venta()[0].foto_producto;
      },
      error: (err) => console.error(err)
    })

    this.apiVentasService.getTipoMoneda().subscribe({
      next: (response: any) => {
        this.monedaVenta.set(response.data);
      },
      error: (err) => console.error(err)
    })

    this.apiVentasService.getAllInventory().subscribe({
      next: (response: any) => {
        this.inventory.set(response.data);
      },
      error: (err) => console.error(err)
    })
    
  }



  onSubmitEditCompras(){
    console.log(this.editComprasForm.value);
  }

  changeImagePreview(event: any){
    this.image = event.target.file[0];
  }

}
