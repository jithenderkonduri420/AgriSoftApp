import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, first, map, take } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private loadingController: LoadingController,
    private http: HttpClient,
    private authService: AuthenticationService,
    public alertController: AlertController,
    private router: Router
  ) {}
  public processError(error: any): Observable<any> {
    let title = '';
    let errorJson;
    if (error && error.json) {
      errorJson = error.json();
    } else {
      errorJson = error;
    }

    switch (error.status) {
      case 0:
        title = 'Failed to reach API';
        this.failedAlert(title, 'Please try again in a couple of moments');
        break;
      case 401:
        this.failedAlert(title, 'Please try again in a couple of moments');
        this.authService.logout();
        break;
      case 405:
        title = "Endpoint doesn't exist";
        this.failedAlert(
          title,
          'We had an issue accessing one of our endpoints'
        );
        break;
      case 500:
        title = 'Server Internal Error';
        this.failedAlert(
          title,
          'Server is not responding now. Please try again later!'
        );
        break;
      default:
        title = 'Server Internal Error';
        this.failedAlert(
          title,
          'Server is not responding now. Please try again later!'
        );
        break;
    }
    return throwError(error);
  }

  public getDistributorDetails(distributor: any): Observable<any> {
    return this.http
      .get<any>(`${environment.api_prefix_url}/distributor/${distributor._id}`)
      .pipe(catchError((error: any) => this.processError(error)));
  }
  public orderPlace(order: any){
    this.loadingController
      .create({ keyboardClose: true, message: 'Loging In ...' })
      .then((loadingEl) => {
        loadingEl.present();
        return this.http
          .post<any>(`${environment.api_prefix_url}/place-order`, order)
          .subscribe(
            res => {
              loadingEl.dismiss(); // hide loading
              this.router.navigate(['home/dashboard']);
            },
            err => {
              this.failedAlert('Order Failed', 'Order not placed. please try again after some time');
              loadingEl.dismiss(); // hide loading
            }
          );
      });
  }
  async failedAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}

