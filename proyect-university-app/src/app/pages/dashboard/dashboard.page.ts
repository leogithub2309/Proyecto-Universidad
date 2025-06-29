import { Component, ElementRef, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
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
import { ApiVentasService } from 'src/app/services/api-ventas.service';
import { ApiComprasService } from 'src/app/services/api-compras.service';
import { Ventas } from 'src/app/model/response';
import { CompraInterface } from 'src/app/model/compras';

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
  apiVentasServices = inject(ApiVentasService);
  apiComprasServices = inject(ApiComprasService);
  sumVentas: number = 0
  sumCompras: number = 0;
  currency = signal<number>(0 || 106.43);
  data: any[] = [];

  constructor() {
    addIcons({ home });
    this.chartOptions = {
      series: [0, 0],
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
      ],
    };
  }

  ngOnInit() {

    let id = String(sessionStorage.getItem("userIdSession"));

    this.apiVentasServices.getCurrentCurrency("dollar").subscribe({
      next: (res: any) => {
        this.currency.set(res.monitors.bcv.price || 106.43);
      },

      error: (err) => console.error(err)
    })

    this.apiVentasServices.getAllVentas(Number(id)).subscribe({
      next: (res: any) => {
        this.getToalBs(res.data, 'ventas');
      },

      error: (err) => console.error(err)
    });

    this.apiComprasServices.getAllCompras(Number(id)).subscribe({
      next: (res: any) => {
        this.getToalBs(res.data, 'compras');
      },
      error: (err) => console.error(err)
    })

    this.apiComprasServices.getDataChart(Number(id)).subscribe({
      next: (response: any) => {
        let data1 = 0, data2 = 0, convertion = 0;

        response.data[0].forEach((value: any) => {
          if(value.moneda === "$"){
            convertion = this.currency() * Number(value.monto_moneda);
            data1 += convertion;
          }else if(value.moneda === "€"){
            convertion = this.currency() * Number(value.monto_moneda);
            data1 += convertion;
          }else if(value.moneda === "Bs") data1 += Number(value.monto_moneda);
        });

        response.data[1].forEach((value: any) => {
          if(value.moneda === "$"){
            convertion = this.currency() * Number(value.monto_moneda);
            data2 += convertion;
          }else if(value.moneda === "€"){
            convertion = this.currency() * Number(value.monto_moneda);
            data2 += convertion;
          }else if(value.moneda === "Bs") data2 += Number(value.monto_moneda);
        });

        this.data.push(
          Number((data2 / this.currency()).toFixed(2)), 
          Number((data1 / this.currency()).toFixed(2))
        );

        this.crearGrafico();
        
      },
      error: (err) => console.error(err)

    })

    

  }

  getToalBs(data: any, type: string){
  
    let convertion = 0;
  
    switch(type){
        case 'ventas':
           this.apiVentasServices.getCurrentCurrency("dollar").subscribe({
            next: (res: any) => {
              this.currency.set(res.monitors.bcv.price || 106.43);
              data.forEach((value: Ventas) => {
                if(value.moneda === "$"){
                  convertion = this.currency() * Number(value.monto_moneda);
                  this.sumVentas += convertion;
                }else if(value.moneda === "€"){
                  convertion = this.currency() * Number(value.monto_moneda);
                  this.sumVentas += convertion;
                }else if(value.moneda === "Bs") this.sumVentas += Number(value.monto_moneda);
                
              });

              this.sumVentas = this.sumVentas / this.currency();
              
            },
            error: (err) => console.error(err)
          });
        break;

        case 'compras':
          this.apiComprasServices.getCurrentCurrency("dollar").subscribe({
            next: (res: any) => {
              this.currency.set(res.monitors.bcv.price || 106.43);
              
              data.forEach((value: CompraInterface) => {
                if(value.moneda === "$"){
                  convertion = this.currency() * Number(value.monto_moneda);
                  this.sumCompras += convertion;
                }else if(value.moneda === "€"){
                  convertion = this.currency() * Number(value.monto_moneda);
                  this.sumCompras += convertion;
                }else if(value.moneda === "Bs") this.sumCompras += Number(value.monto_moneda);
                
              });

              this.sumCompras = this.sumCompras / this.currency();
            },

            error: (err) => console.error(err)
          })
        break;

    }

  }

  crearGrafico(){
    this.chartOptions = {
      series: this.data || [30, 51.64],
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
      ],
    }
  }

  closeSession(){
    sessionStorage.clear();
    this.cookieService.delete("tokenUser");
    this._router.navigate(['/home']);
  }

}
