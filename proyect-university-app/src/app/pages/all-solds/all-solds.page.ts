import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons  } from '@ionic/angular/standalone';
import { AllSoldComponent } from 'src/app/components/all-sold/all-sold.component';

@Component({
  selector: 'app-all-solds',
  templateUrl: './all-solds.page.html',
  styleUrls: ['./all-solds.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    IonBackButton,
    IonButtons,  
    FormsModule,
    AllSoldComponent
  ]
})
export class AllSoldsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
