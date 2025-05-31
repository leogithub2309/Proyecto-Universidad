import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonTab, IonTabs, IonTabBar, IonTabButton} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';
import { VentasComponent } from 'src/app/components/ventas/ventas.component';
import { ComprasComponent } from 'src/app/components/compras/compras.component';
import { 
  ChartComponent, 
  NgApexchartsModule, 
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart 
} from "ng-apexcharts";

export type ChartOptions = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
};

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
    ComprasComponent,
    NgApexchartsModule,
    RouterLink
]
})
export class DashboardPage implements OnInit {

  _router = inject(Router);
  cookieService = inject(CookieService);
  chartOptions!: Partial<ChartOptions>;
  @ViewChild('chart') chart!: ElementRef;

  constructor() {
    addIcons({ home });
    this.chartOptions = {
      series: [440, 560],
      chart: {
        type: "donut"
      },
      labels: ["Ventas", "Compras"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  }

  ngOnInit() {

  }


  closeSession(){
    sessionStorage.removeItem("tokenUserSession");
    this.cookieService.delete("tokenUser");
    this._router.navigate(['/home']);
  }

}
