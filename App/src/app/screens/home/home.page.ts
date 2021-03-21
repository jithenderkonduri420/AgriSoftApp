import { Router } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import {
  IonTabs,
  Platform,
  NavController,
  IonRouterOutlet,
} from '@ionic/angular';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentUser: any;
  isLogin: boolean = false;
  selectedTab: string = '';
  @ViewChild('tabs', { static: true }) tabs: IonTabs;
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.authService.userDetails().then((res: any) => {
      this.currentUser = res.user;
      this.isLogin = this.authService.currentUserValue;
    });
  }
  async openTab(tab: string, evt: MouseEvent) {
    const tabSelected = this.tabs.getSelected();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    this.selectedTab = tab;
    console.log(this.selectedTab);
    return tabSelected !== tab
      ? await this.navCtrl.navigateRoot(this.tabs.outlet.tabsPrefix + '/' + tab)
      : this.tabs.select(tab);
  }
  notifications() {
    this.router.navigate(['/home/notifications']);
  }
  logout() {
    this.authService.logout();
  }
}
