import { Component } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  list_task : any[] = [];

  constructor(
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController
            ) {

              //recuperando dados no localstorege
              let task_app_db = localStorage.getItem('task_app_db');
              if(task_app_db != null){
                this.list_task = JSON.parse(task_app_db);
              }

            }

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

  async openActions(task){

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer ?',
      buttons: [{
        text: task.done ? 'Desmarcar':'Marcar',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          task.done = !task.done;
          this.updateLocaStorage();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  delete(task:any){

    //semelhante a funcao map, esta fazendo um loop no array 'list_task' e
    //vai manter no array todos as task que forem diferente da task passada 
    //no parametro da funcao.
    this.list_task = this.list_task.filter(taskArray => task != taskArray);
    this.updateLocaStorage();

  }

}
