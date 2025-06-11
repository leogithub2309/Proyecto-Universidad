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

@Component({
  selector: 'app-add-compras',
  templateUrl: './add-compras.component.html',
  imports: [
    IonItem,
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
  }


  changeImagePreview(event: any){
    let path = "../../../assets/" + event.target.files[0].name || "http://localhost:80/uploaderImages/uploads/" + event.target.files[0].name;

    if(event.target.files[0]) this.foto_producto.nativeElement.src = path;
    
    else this.foto_producto.nativeElement.src = path;

    this.images = event.target.files[0];
  }


}
