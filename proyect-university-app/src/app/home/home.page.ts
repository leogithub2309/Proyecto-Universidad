import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonInputPasswordToggle  } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonInput, 
    IonButton,
    IonInputPasswordToggle,
    ReactiveFormsModule,
    RouterLink
  ],
})
export class HomePage {
  
  fb = inject(FormBuilder);

  login: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-zÁáÉéÍíÓóÚú]+$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9ÁáÉéÍíÓóÚú]+$/)])
  });
  
  constructor() {}
}
