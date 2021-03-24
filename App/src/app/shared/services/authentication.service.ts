import { UtilsService } from './utils.service';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private storage: Storage,
    private plt: Platform,
    private router: Router,
    public alertController: AlertController,
    private utilsService: UtilsService
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  login(values) {
    this.loadingController
      .create({ keyboardClose: true, message: 'Loging In ...' })
      .then((loadingEl) => {
        loadingEl.present(); // show loading
        this.http
          .post<any>(`${environment.auth_prefix_url}/app-signin`, values)
          .subscribe(
            (res) => {
              loadingEl.dismiss(); // hide loading
              if (res.accessToken) {
                return this.storage.set(TOKEN_KEY, res.accessToken).then(() => {
                  this.authenticationState.next(true);
                  this.router.navigate(['home']);
                });
              } else {
                this.loginFailedAlert(
                  'Login Invalid!',
                  'Please login with valid userid and password.'
                );
                this.logout();
              }
            },
            (err) => {
              this.loginFailedAlert(
                'Login Invalid!',
                'Please login with valid userid and password.'
              );
              this.logout();
              loadingEl.dismiss(); // hide loading
            }
          );
      });
  }
  updatePassword(values) {
    this.loadingController
      .create({
        keyboardClose: true,
        message: 'Your Password is updating please wait for some time ...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.http
          .post<any>(
            `${environment.auth_prefix_url}/change-password`,
            values
          )
          .subscribe(
            (res) => {
              console.log(res);
              loadingEl.dismiss(); // hide loading
              if (!res.error) {
                this.utilsService.presentToastSuccess(
                  'Password has been changed successfully'
                );
              } else {
                this.loginFailedAlert(
                  'Change Password!',
                  res.message
                );
              }
            },
            (err) => {
              loadingEl.dismiss(); // hide loading
              this.loginFailedAlert(
                'Change Password!',
                err.error.message
              );
            }
          );
      });
  }
  logout() {
    return this.storage.clear().then(() => {
      this.authenticationState.next(false);
      this.router.navigate(['login']);
    });
  }

  isAuthenticated() {
    if (!this.authenticationState.value) {
      this.router.navigate(['login']);
    }
    return this.authenticationState.value;
  }
  public get currentUserValue(): any {
    return this.authenticationState.value;
  }
  public userDetails() {
    return this.storage.get(TOKEN_KEY).then((token) => jwt_decode(token));
  }

  async loginFailedAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
