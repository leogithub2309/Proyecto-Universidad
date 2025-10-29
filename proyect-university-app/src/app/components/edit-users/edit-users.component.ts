import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonButton, IonInput, IonSelect, IonSelectOption, ToastController } from '@ionic/angular/standalone';
import { ApiVentasService } from 'src/app/services/api-ventas.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  imports:[
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    ReactiveFormsModule,
    
  ],
  styleUrls: ['./edit-users.component.scss'],
})
export class EditUsersComponent  implements OnInit {
  
  fb = inject(FormBuilder);
  registerForm: FormGroup;
  activatedRoute = inject(ActivatedRoute);
  idUser = signal<string|null>(this.activatedRoute.snapshot.paramMap.get("id"));

  loginService = inject(LoginService);
  apiVentasServices = inject(ApiVentasService);
  roles = signal<any[]>([]);
  users = signal<any>([]);
  toastController = inject(ToastController);

  customActionSheetRoles = {
    header: 'Roles',
    subHeader: 'Select User Rol',
  };

  customActionSheetStatus = {
    header: 'Status',
    subHeader: 'Select status user',
  };

  constructor() {

    this.registerForm = this.fb.group({
      primer_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚú]/)]),
      segundo_nombre: new FormControl('', [Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚú]/)]),
      primer_apellido: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚú]/)]),
      segundo_apellido: new FormControl('', [Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚú]/)]),
      cedula: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(8)]),
      tipo_identidad:  new FormControl('V-', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(11)]),
      direccion_1: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9ÁáÉéÍíÓóÚú]/)]),
      direccion_2: new FormControl('', [Validators.pattern(/^[A-Za-z0-9ÁáÉéÍíÓóÚú]/)]),
      codigo_postal: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      id_rol: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚú]/)]),
      password: new FormControl('', [Validators.pattern(/^[A-Za-z0-9ÁáÉéÍíÓóÚú]+$/)])
    });

  }
  
  ngOnInit() {

    this.loginService.getAllUsers().subscribe({
      next: async (response: any) => {

        const user = response.users.find((data: any) => data.id_usuario === Number(this.idUser()));
        this.users.set(user);
          
        this.registerForm.patchValue({
          primer_nombre: this.users().primer_nombre,
          segundo_nombre: this.users().segundo_nombre,
          primer_apellido: this.users().primer_apellido,
          segundo_apellido: this.users().segundo_apellido,
          cedula: this.users().cedula,
          tipo_identidad: this.users().tipo_identidad,
          telefono: this.users().telefono,
          direccion_1: this.users().direccion_1,
          direccion_2: this.users().direccion_2,          
          codigo_postal: this.users().codigo_postal,
          id_rol: this.users().id_rol,
          status: this.users().status,
          username: this.users().username
        });
      },
      error: (reason) => console.error(reason)
    });

  }

  onUpdateUser(){

    this.registerForm.patchValue({ password: this.users().password });

    this.loginService.updateUser(this.registerForm.value, Number(this.idUser())).subscribe({
      next: async (response: any) => {
        
        if(response.status === 201){
          const toast = await this.toastController.create({
            header: response.title,
            message: response.description || "Se actualizó el usuario correctamente",
            duration: 3000,
            color: "success",
            position:"bottom"
          });
          await toast.present();
        }
      },
      error: async (reason) => {
        console.error(reason);
        const toast = await this.toastController.create({
          message: reason.description || "Error, no se pudo actualizar el usuario, intente de nuevo",
          duration: 3000,
          color: "danger",
          position:"bottom"
        });
        await toast.present();
       
      }
    });
    
  }

  
}
