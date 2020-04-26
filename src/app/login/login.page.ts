import { Component } from '@angular/core';
import Parse from 'parse';
import { Router } from '@angular/router';

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

  constructor(private router:Router) {
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
    this.router.navigateByUrl('home');
    // Parse.User.logIn(this.username, this.password)
    // .then(() => {
    //     this.router.navigateByUrl('home');
    // })
    // .catch(error => {
    //   alert(error);
    // });
  }

}
