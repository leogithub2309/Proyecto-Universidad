import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    RouterLink,
    IonIcon
  ]
})
export class AdminUserComponentComponent  implements OnInit {

  usersServices = inject(LoginService);
  users = signal<any[]>([]);
  toastController = inject(ToastController);
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

    this.usersServices.updateUserStatus({ status }, id_usuario).subscribe({
      next: async (response: any) => {
        
        if(response.status === 202){
           const toast = await this.toastController.create({
            message:  status === 0 ? response.description : "El usuario ya no tiene status 0, puede acceder a la aplicación",
            duration: 3000,
            color: "success",
            position:"bottom"
          });
          await toast.present();
          setTimeout(() => window.location.reload(), 2000);
        }

      },
      error: async (reason) => {
        console.error(reason);
        const toast = await this.toastController.create({
          message: reason.error || "Error, no se pudo actualizar la compra.",
          duration: 3000,
          color: "danger",
          position:"bottom"
        });
        await toast.present();
      }
      
    });
  }

}
