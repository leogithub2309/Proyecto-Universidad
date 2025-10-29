import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton } from '@ionic/angular/standalone';
import { AdminUserComponentComponent } from "src/app/components/admin-user-component/admin-user-component.component";
import { EditUsersComponent } from "src/app/components/edit-users/edit-users.component";

@Component({
  selector: 'app-edit-users-pages',
  templateUrl: './edit-users-pages.page.html',
  styleUrls: ['./edit-users-pages.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton ,CommonModule, FormsModule, EditUsersComponent]
})
export class EditUsersPagesPage implements OnInit {

  constructor() {


  }

  ngOnInit() {
  }

}
