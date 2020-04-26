import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(
    private router:Router, 
  ) { }

  ngOnInit() {}
  
  onHome(){
    this.router.navigateByUrl('home');
  }

  onNotification(){
    this.router.navigateByUrl('notifications');
  }

  onProfile(){
    this.router.navigateByUrl('profile');
  }

}
