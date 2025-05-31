import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-all-solds',
  templateUrl: './all-solds.page.html',
  styleUrls: ['./all-solds.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AllSoldsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
