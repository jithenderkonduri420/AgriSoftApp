import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent {

  version: string = "0.7.2";

  appPages = [
      {
          title: 'Home',
          url: '/home/dashboard',
          icon: 'home'
      },
      {
          title: 'Change Password',
          url: '/changepassword',
          icon: 'eye'
      }
  ];

  constructor() { }
}
