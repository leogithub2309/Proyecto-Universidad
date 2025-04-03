import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButton,
    CommonModule, 
    FormsModule
  ]
})
export class DashboardPage implements OnInit {

  _router = inject(Router);
  cookieService = inject(CookieService);

  constructor() { }

  ngOnInit() {

    if(!sessionStorage.getItem("tokenUserSession") && !this.cookieService.check("tokenUser")){
      this._router.navigate(['/home']);
    }
  }


  closeSession(){
    sessionStorage.removeItem("tokenUserSession");
    this.cookieService.delete("tokenUser");
    this._router.navigate(['/home']);
  }

}
