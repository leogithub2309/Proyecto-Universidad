import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonInputPasswordToggle  } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RouterLink, Router } from '@angular/router';
import { Login } from '../model/response';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
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
export class HomePage implements OnInit{
  
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  readonly cookieService = inject(CookieService);
  private _router = inject(Router);

  login: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚú]+$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9ÁáÉéÍíÓóÚú]+$/)])
  });

  ngOnInit(): void {
    if(sessionStorage.getItem("tokenUserSession") && this.cookieService.check("tokenUser")){
      this._router.navigate(['/dashboard']);
    }
  }
  
  onLogin(){

    const loginUser: Login = {
      username: this.login.get("username")?.value,
      password: this.login.get("password")?.value
    }

    this.loginService.loginUser(loginUser).subscribe({
      next: (response) => {
        const joinToken = response.result,
          tokenUser = joinToken.createTokenUser.split(".").join("");
        
        this.cookieService.set("tokenUser", tokenUser);
        sessionStorage.setItem("tokenUserSession", JSON.stringify(tokenUser));
        this._router.navigate([joinToken.path]);
      },
      error: (err) => console.error(err)
    });

  }
}
