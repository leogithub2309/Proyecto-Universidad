import { Component, ElementRef, inject, OnInit, resource, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonSelect, IonSelectOption, IonIcon, IonTextarea, IonButton } from '@ionic/angular/standalone';
import e from 'cors';
import { addIcons } from 'ionicons';
import { ApiVentasService } from 'src/app/services/api-ventas.service';
import crypto from 'crypto-js';

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
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddVentasComponent  implements OnInit {

  @ViewChild('foto_producto') foto_producto!: ElementRef;

  apiVentasService = inject(ApiVentasService);

  typeMoney = signal<any[]>([]);

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
      monto_moneda: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    })
  }

  ngOnInit() {
    this.apiVentasService.getTipoMoneda().subscribe({
      next: (res: any) => {
        this.typeMoney.set(res.data);
      },
      error: (err) => console.error(err)
    });

    console.info(this.decripDataSession());
  }


  changeImagePreview(event: any){

    if(event.target.files[0]) this.foto_producto.nativeElement.src = "http://localhost:80/uploaderImages/uploads/" + event.target.files[0].name;
    
    else this.foto_producto.nativeElement.src = "../../../assets/user-svgrepo-com.svg";

    if(!event.target.files[0]) this.foto_producto.nativeElement.src = "../../../assets/user-svgrepo-com.svg";

    this.images = event.target.files[0];
  }

  onSubmit(){

    if(this.images){
      const formData = new FormData();
      formData.append("foto_producto", this.images, this.images.name);
      formData.append('Content-Type','multipart/form-data');

      this.apiVentasService.uploadFiles(formData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => console.error(err)
      });
    }

    
  }


  decripDataSession(): any{

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
