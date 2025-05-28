import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonTab, IonTabs, IonTabBar, IonTabButton} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';
import { VentasPage } from "../ventas/ventas.page";
import { ComprasPage } from "../compras/compras.page";
import { VentasComponent } from 'src/app/components/ventas/ventas.component';
import { ComprasComponent } from 'src/app/components/compras/compras.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonTabs,
    IonTab,
    IonTabBar,
    IonTabButton,
    CommonModule,
    FormsModule,
    VentasComponent,
    ComprasComponent
]
})
export class DashboardPage implements OnInit {

  _router = inject(Router);
  cookieService = inject(CookieService);

  constructor() {
    addIcons({ home });
  }

  ngOnInit() {

  }


  closeSession(){
    sessionStorage.removeItem("tokenUserSession");
    this.cookieService.delete("tokenUser");
    this._router.navigate(['/home']);
  }

}
