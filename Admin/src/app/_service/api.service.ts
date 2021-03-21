import { AuthenticationService } from '../_service/authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
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
      case 405:
        title = "Endpoint doesn't exist";
        this.toastr.error(
          'We had an issue accessing one of our endpoints',
          title
        );
        break;
      case 500:
        this.displayMessage(errorJson);
        break;
      default:
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

  public readAll(uri:any){
    return this.http
      .get<[]>(`${environment.api}/${uri}`)
      .pipe(catchError((error: any) => this.processError(error)));
  }

  public read(id:any): Observable<any> {
    return this.http
      .get(`${environment.api}/${id}`)
      .pipe(catchError((error: any) => this.processError(error)));
  }

  public create(data:[]): Observable<any> {
    return this.http.post(environment.api, data);
  }

  public update(id:any, data:[]): Observable<any> {
    return this.http.put(`${environment.api}/${id}`, data);
  }

  public delete(id:any): Observable<any> {
    return this.http.delete(`${environment.api}/${id}`);
  }

  public deleteAll(): Observable<any> {
    return this.http.delete(`${environment.api}`);
  }
}
