import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, ToastController } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Register } from '../model/response';

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
    RouterLink
  ]
})
export class RegisterPage implements OnInit {

  loginService = inject(LoginService);
  isRegister= signal<boolean>(false);
  toastController = inject(ToastController);

  fb = inject(FormBuilder);
  registerForm = this.fb.group({
    nombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚú]/)]),
    cedula: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(10)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(11)]),
    direccion: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9ÁáÉéÍíÓóÚú]/)]),
    codigo_postal: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚú]/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9ÁáÉéÍíÓóÚú]+$/)])
  });

  ngOnInit() {
  }

  onRegisterUser(){

    const registerUser: Register = {
      nombre: String(this.registerForm.get('nombre')?.value),
      cedula: "V-"+String(this.registerForm.get('cedula')?.value),
      telefono: String(this.registerForm.get('telefono')?.value),
      direccion: String(this.registerForm.get('direccion')?.value),
      codigo_postal: parseInt(String(this.registerForm.get('codigo_postal')?.value)),
      username: String(this.registerForm.get('username')?.value),
      password: String(this.registerForm.get('password')?.value),
      id_rol: 2
    }

    this.loginService.registerUser(registerUser).subscribe({
      next: async (response) => {
       if(response.status === 200){
        const toast = await this.toastController.create({
          message: response.description || "Se agregò un nuevo usuario correctamente",
          duration: 3000,
          color: "success"
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
          color: "danger"
        });
        await toast.present();
      }
    })

  }

}
