import { Component, OnInit } from '@angular/core';
import Parse from 'parse';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { error } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  openCloseBtn;
  devices;

  constructor(
    private router:Router, 
    public toastController: ToastController,
    private bluetoothSerial: BluetoothSerial,
    public modalController: ModalController,
    private loadingController: LoadingController
  ) {
    
  }

  ngOnInit() {
    this.activateBluetooth();
  }

  onLogout(){
    this.router.navigateByUrl('login');
  }

  onChat(){
    this.router.navigateByUrl('chat');
  }

  async presentModal(data) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        devices: data
      }
    });
    return await modal.present();
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


  activateBluetooth(){
    this.bluetoothSerial.isEnabled()
    .then(() => {
      this.showToast('Bluetooth activated');
      //this.getListDevices();
    })
    .catch(error => {
      this.showToast('Error'+error);
    });
  }

  getListDevices(){
    this.bluetoothSerial.list()
    .then(response => {
      this.devices = response;
    })
    .catch(error => {
      this.showToast('Error while getting list of devices'+error);
    })
  }

  connectedDevice(){

  }

  async connectToDevice(address){
    await this.presentLoading('Conectando...');
    this.bluetoothSerial.connect(address).subscribe(resp => {
      this.showToast(`Connected to: ${address}`);
    }, error => {
      this.showToast(error);
    });
  }

  sendBluetoothMessage(type){
    this.bluetoothSerial.write(type)
    .then(success => {
      console.log(success);
    })
    .catch(error => {
      console.log(error);
    });
  }

  async showListDevices(){
    await this.getListDevices();
    await this.presentLoading('Buscando dispositivos...');
    console.log('All devices', this.devices);
    this.presentModal(this.devices);
  }

  async actionDoor(element) {
    this.openCloseBtn = document.querySelector(element);

    if(this.openCloseBtn.getAttribute('color') == 'danger'){
      this.sendBluetoothMessage('1');
      this.openCloseBtn.innerText = 'Open';
      this.openCloseBtn.setAttribute('color', 'success');
      this.showToast('Closing door...');
    }
    else {
      this.sendBluetoothMessage('2');
      this.openCloseBtn.innerText = 'Close';
      this.openCloseBtn.setAttribute('color', 'danger');
      this.showToast('Opening door...');
    }

  }

  personDoor(){
    this.actionDoor('#personBtn');
  }

  carDoor(){
    this.actionDoor('#carBtn');
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
