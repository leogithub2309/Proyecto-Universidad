import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonInput, 
  IonButton, 
  ToastController, 
  IonSelectOption,
  IonSelect, 
  IonIcon
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Register } from '../model/response';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader,
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonIcon,  
    IonSelect, 
    IonSelectOption,
    RouterLink
  ]
})
export class RegisterPage implements OnInit {

  loginService = inject(LoginService);
  isRegister= signal<boolean>(false);
  toastController = inject(ToastController);
  _router = inject(Router);
  cookieService = inject(CookieService);


  fb = inject(FormBuilder);
  registerForm = this.fb.group({
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
    username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚú]/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9ÁáÉéÍíÓóÚú]+$/)])
  });

  ngOnInit(){

    if(sessionStorage.getItem("tokenUserSession") && this.cookieService.check("tokenUser")){
      this._router.navigate(['/dahsboard']);
    }

  }

  onRegisterUser(){

    const registerUser: Register = {
      primer_nombre: String(this.registerForm.get('primer_nombre')?.value),
      segundo_nombre: String(this.registerForm.get('segundo_nombre')?.value),
      primer_apellido: String(this.registerForm.get('primer_apellido')?.value),
      segundo_apellido: String(this.registerForm.get('segundo_apellido')?.value),
      cedula: Number(this.registerForm.get('cedula')?.value),
      tipo_identidad: String(this.registerForm.get('tipo_identidad')?.value),
      telefono: String(this.registerForm.get('telefono')?.value),
      direccion_1: String(this.registerForm.get('direccion_1')?.value),
      direccion_2: String(this.registerForm.get('direccion_2')?.value),
      codigo_postal: Number(this.registerForm.get('codigo_postal')?.value),
      username: String(this.registerForm.get('username')?.value),
      password: String(this.registerForm.get('password')?.value),
      id_rol: 2
    }

    this.loginService.registerUser(registerUser).subscribe({
      next: async (response) => {
       if(response){
        const toast = await this.toastController.create({
          message: response.description || "Se agregò un nuevo usuario correctamente",
          duration: 3000,
          color: "success",
          position:"bottom"
        });

        await toast.present();
       }
       this.registerForm.reset();
      },
      error: async (err) => {
        console.error(err);
        const toast = await this.toastController.create({
          message: "Error, no se pudo registrar un nuevo usuario, intente de nuevo",
          duration: 3000,
          color: "danger",
          position:"bottom"
        });
        await toast.present();
      }
    })

  }

}
