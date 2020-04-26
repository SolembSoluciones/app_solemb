import { Component } from '@angular/core';
import Parse from 'parse';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  // private parseAppId: string = 'solemApp';
  // private parseServerUrl: string = 'https://solemb.herokuapp.com/parse';
  // private User = new Parse.Object.extend('User');

  // username:string;
  // password:string;

  constructor(
    private router:Router,
    public loadingController: LoadingController
  ) {
    // this.parseInitialize();
  }

  // private parseInitialize() {
  //   Parse.initialize(this.parseAppId);
  //   Parse.serverURL = this.parseServerUrl;
  // }

  ngOnInit(){
    // Parse.User.enableUnsafeCurrentUser();
    // var currentUser = Parse.User.current();
    // if (currentUser) {
    //   this.router.navigateByUrl('home');
    // } else {
    //     // show the signup or login page
    // }
  }

  async onLogin(){
    this.presentLoading()
    .then(()=>{
      this.router.navigateByUrl('home');
    });
    // Parse.User.logIn(this.username, this.password)
    // .then(() => {
    //     this.router.navigateByUrl('home');
    // })
    // .catch(error => {
    //   alert(error);
    // });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

}
