import { Component } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './shared/services/authentication.service';
import { Router } from '@angular/router';
import { UtilsService } from './shared/services/utils.service';
import { Splash } from './screens/splash/splash.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isLoggedIn: boolean;
  navigate: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private utilsService: UtilsService,
    private modalCtrl: ModalController
  ) {
    this.utilsService.observeNetwork();
    this.initializeApp();
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe((state) => {
        if (state) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });
    });
  }

  sideMenu() {
    this.navigate = [
      {
        title: 'Change Password',
        url: '/home',
        icon: 'contact',
      },
      {
        title: 'Logout',
        url: '/chat',
        icon: 'log-out',
      },
    ];
  }
}
