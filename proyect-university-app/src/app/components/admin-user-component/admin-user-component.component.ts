import { Component, OnInit, inject, signal } from '@angular/core';
import { IonButton, IonIcon, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-user-component',
  templateUrl: './admin-user-component.component.html',
  styleUrls: ['./admin-user-component.component.scss'],
  imports: [
    IonItem, 
    IonLabel, 
    IonList,
    IonButton,
    IonIcon
  ]
})
export class AdminUserComponentComponent  implements OnInit {

  usersServices = inject(LoginService);
  users = signal<any[]>([]);

  constructor() { }

  ngOnInit() {

    this.usersServices.getAllUsers().subscribe({
      next: (response: any) => {
        this.users.set(response.users);
      },
      error: (err) => console.error(err)
    });

  }


  updateStatusUser(status: number, id_usuario: number){
   
    const objStatus = {
      status
    }
    
    this.usersServices.updateUserStatus(objStatus, id_usuario).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (reason) => console.error(reason)
    });
  }

}
