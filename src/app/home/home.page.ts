import { Component, OnInit } from '@angular/core';
import Parse from 'parse';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router:Router, 
    public toastController: ToastController
  ) {
    
  }

  ngOnInit() {

  }

  onLogout(){
    this.router.navigateByUrl('login');
  }

  onChat(){
    this.router.navigateByUrl('chat');
  }

  async openingDoor() {
    const toast = await this.toastController.create({
      message: 'Opening door...',
      duration: 2000
    });
    toast.present();
  }

  async openDoor() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
