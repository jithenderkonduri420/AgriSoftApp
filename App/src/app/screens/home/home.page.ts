import { ApiService } from './../../shared/services/api.service';
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
  count: any = 0;
  notifies: any = [];
  currentUser: any;
  isLogin: boolean = false;
  selectedTab: string = '';
  @ViewChild('tabs', { static: true }) tabs: IonTabs;
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private router: Router,
    private apiService: ApiService
  ) {
    this.authService.userDetails().then((res: any) => {
      this.currentUser = res.user;
      this.isLogin = this.authService.currentUserValue;
      this.apiService.getAllNotifications(this.currentUser).subscribe((res) => {
        this.notifies = res.notifications;
        this.count = this.notifies.map((res: any) => {
          return res.records.filter((n: any) => !n.isRead).length;
        });
      });
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
