import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminUserComponentComponent } from "src/app/components/admin-user-component/admin-user-component.component";


@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.page.html',
  styleUrls: ['./admin-users-page.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonBackButton,
    IonIcon,
    CommonModule,
    FormsModule,
    AdminUserComponentComponent
]
})
export class AdminUsersPagePage implements OnInit {

  cookieService = inject(CookieService);
  _router = inject(Router);

  constructor() { }

  ngOnInit() {
  }


  closeSession(){
    sessionStorage.clear();
    this.cookieService.delete("tokenUser");
    this._router.navigate(['/home']);
  }

}
