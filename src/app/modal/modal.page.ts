import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private bluetoothSerial: BluetoothSerial,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalController.dismiss();
  }
  async showToast(message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  
  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message: message,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async connectToDevice(address){
    await this.presentLoading('Conectando...');
    this.bluetoothSerial.connect(address).subscribe(resp => {
      this.showToast(`Connected to: ${address}`);
    }, error => {
      this.showToast(error);
    });
  }
}
