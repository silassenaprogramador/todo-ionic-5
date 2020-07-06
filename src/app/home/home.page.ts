import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  list_task : any[] = [];

  constructor(
              private alertCtrl: AlertController,
              private toastCtrl: ToastController
            ) {}

  async showAdd(){

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'O que deseja fazer ?',
      inputs: [
        {
          name: 'taskName',
          type: 'text',
          placeholder: 'Digite uma terefa'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (form) => {
            console.log('Confirm Ok');
            this.add(form.taskName)
          }
        }
      ]
    }); 

    await alert.present();
  }

  async add(nome_task:string){
    
    if(nome_task.trim().length < 1){
      const toast = await this.toastCtrl.create({
        message:'informe o que deseja fazer',
        duration:2000,
        position:'top'
      });

      toast.present();
      return;
    }

    let task = {name:nome_task,done:false};
    this.list_task.push(task);
    this.updateLocaStorage(); 
  }

  updateLocaStorage(){

    localStorage.setItem('task_app_db',JSON.stringify(this.list_task));
  }

}
