import { AuthenticationService } from '../_service/authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, first, map, take } from 'rxjs/operators';
import { User } from '../_models/user.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {}
  public processError(error: any): Observable<any> {
    let title = '';
    let errorJson;
    if (error && error.json) {
      errorJson = error.json();
    } else {
      errorJson = error;
    }
    console
    switch (error.status) {
      case 0:
        title = 'Failed to reach API';
        this.toastr.error('Please try again in a couple of moments', title);
        break;
      case 401:
        if (errorJson.message === 'Client or key not accepted') {
          this.authService.logout();
        }
        title = 'Login Required';
        this.toastr.error("You'll need to log in again to continue.", title);
        break;
      case 422:
        title = 'Required Fields';
        this.toastr.error("Some fields are missed. Please enter all required fields", title);
        break;
      case 405:
        title = "Endpoint doesn't exist";
        this.toastr.error(
          'We had an issue accessing one of our endpoints',
          title
        );
        break;
      case 500:
        title = "Api Internal Error";
        this.toastr.error(
          'Server not responding this api. Please try again later',
          title
        );
        this.displayMessage('Server not responding this api. Please try again later');
        break;
      default:
        title = "Api Internal Error";
        this.toastr.error(
          'Server not responding this api. Please try again later',
          title
        );
        this.displayMessage(errorJson);
        break;
    }

    console.error(title, error);

    return throwError(error);
  }

  private displayMessage(errorJson: any) {
    if (errorJson && errorJson.error && errorJson.error.message) {
      let message = JSON.stringify(errorJson.error.message);
      let details = errorJson.error.details;
      if (errorJson.error.message.message) {
        message = errorJson.error.message.message;
        details = errorJson.error.message.details;
      }

      if (typeof details === 'string') {
        this.toastr.error(details, message);
      } else {
        this.toastr.error(message, errorJson.code);
      }
    } else if (errorJson) {
      this.toastr.error(errorJson.message, errorJson.code);
    }
  }
  public users(): Observable<any> {
    return this.http
      .get<User>(`${environment.api}/users`)
      .pipe(catchError((error: any) => this.processError(error)));
  }

  readAll(uri: string): Observable<any> {
    return this.http
      .get<any>(`${environment.api}/${uri}`)
      .pipe(catchError((error: any) => this.processError(error)));
  }

  create(uri:string, data: []): Observable<any> {
    return this.http
      .post<any>(`${environment.api}/${uri}`, data)
      .pipe(catchError((error: any) => this.processError(error)));
  }
}
