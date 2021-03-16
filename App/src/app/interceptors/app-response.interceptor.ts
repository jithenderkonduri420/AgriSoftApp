import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { ConfigService } from '../modules/shared/services';

const { Device, Browser } = Plugins;

declare var require: any;

@Injectable()
export class AppResponseInterceptor implements HttpInterceptor {

    version: any = environment.apkVersion;
    apiVersionNo: any ;
    iosStoreUrl = environment.playStoreUrl.ios;
    androidStoreUrl = environment.playStoreUrl.android;
  
    isMobile: any;
    isboolean = true;
    flag = true;
    deviceInfo: any;
    constructor( 
      private platform: Platform,
      public route: Router,
      public alertController: AlertController,
      private configService: ConfigService,
    ) {
        this.isMobile = this.platform.is('android') || this.platform.is('ios');
        this.init();
    }

    async init() {
      this.deviceInfo = await Device.getInfo();
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.flag = true;
      return next.handle(request).pipe(tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.apiVersionNo = event.headers.get('Version');
            if (this.isMobile &&
              (this.deviceInfo.platform === 'ios' ||
              this.deviceInfo.platform === 'android') &&
              this.apiVersionNo) {
              this.apiVersionNo = this.apiVersionNo.replace(/\./g, '');
              this.version = this.version.replace(/\./g, '');
              if (parseInt(this.version) < parseInt(this.apiVersionNo)) {
                this.updateVersion();
                this.isboolean = false;
              }
            }
          }
        }

      ));
    }

    async presentAlertUpdate() {
      const alert = await this.alertController.create({
        cssClass: 'alert-confirm-box',
        header: 'Update available',
        subHeader: '',
        message: 'New version is available. Please update.',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Update Now',
            cssClass: 'secondary',
            handler: (blah) => {
              if (this.deviceInfo.platform === 'ios') {
                (async () => await Browser.open({ url: this.iosStoreUrl }))();
              } else if (this.deviceInfo.platform === 'android') {
                (async () => await Browser.open({ url: this.androidStoreUrl }))();
              }
              return false;
            }
          }
        ]
      });
  
      await alert.present();
    }

    updateVersion() {
        if (this.isboolean) {
          this.configService.checkApkVersion()
          .subscribe((r: any) => {
            this.iosStoreUrl = r?.ios_link;
            this.androidStoreUrl = r?.apk_link;
            this.presentAlertUpdate();
          });
        }
    }



}
