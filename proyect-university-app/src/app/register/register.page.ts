import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

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

  fb = inject(FormBuilder);
  registerForm = this.fb.group({
    nombre: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required, Validators.pattern(/[0-9]+$/), Validators.maxLength(10)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/[0-9]+$/), Validators.maxLength(12)]),
    direccion: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit() {
  }

}
