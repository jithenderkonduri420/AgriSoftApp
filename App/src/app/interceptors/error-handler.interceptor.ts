import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastController,
    private router: Router,
    private auth: AuthenticationService,
    public alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      // console.log('Request error', response);
    }

    const isJson = (str) => {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    };
    if (response instanceof HttpErrorResponse) {
      switch (response.status) {
        case 401: // login
          if (sessionStorage.getItem('userToken')) {
            this.apiFailedAlert('Login Invalid!', 'User is invalid');
            this.router.navigateByUrl('/unauthorized');
          }
          setTimeout(() => {
            this.auth.logout();
          }, 1000);
          break;
        case 403: // forbidden
          this.router.navigateByUrl('/forbidden');
          break;
        case 404:
          this.apiFailedAlert('Server', 'App Internal Error');
          this.router.navigateByUrl('/login');
          break;
        case 0:
          this.apiFailedAlert('Server', 'App Internal Error');
      }
    }
    throw response;
  }
  async apiFailedAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
