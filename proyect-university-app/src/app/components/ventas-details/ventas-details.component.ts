import { Component, computed, input, OnInit } from '@angular/core';
import { Ventas } from 'src/app/model/response';

@Component({
  selector: 'app-ventas-details',
  templateUrl: './ventas-details.component.html',
  styleUrls: ['./ventas-details.component.scss'],
})
export class VentasDetailsComponent  implements OnInit {

  ventaDeails = input<any>([]);

  getDetails = computed(() => this.ventaDeails());

  constructor() { }

  ngOnInit() {
    console.log(this.getDetails());
  }

}
