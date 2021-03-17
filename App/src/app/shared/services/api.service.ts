import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, first, map, take } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    public alertController: AlertController
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
        this.failedAlert(title, 'We had an issue accessing one of our endpoints');
        break;
      case 500:
        title = "Server Internal Error";
        this.failedAlert(title, 'Server is not responding now. Please try again later!');
        break;
      default:
        title = "Server Internal Error";
        this.failedAlert(title, 'Server is not responding now. Please try again later!');
        break;
    }
    return throwError(error);
  }

  async failedAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
  public getDistributorDetails(distributor: any): Observable<any> {
    return this.http
      .get<any>(`${environment.api_prefix_url}/distributor/${distributor._id}`)
      .pipe(catchError((error: any) => this.processError(error)));
  }
}
