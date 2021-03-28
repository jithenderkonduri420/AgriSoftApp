import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

import { UtilsService } from 'src/app/shared/services//utils.service';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  toogleType: boolean = true;
  formSubmitted = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private utilsService: UtilsService,
    private callNumber: CallNumber
  ) {}

  ngOnInit() {
    this.initForm();
    /**
     * check login state
     */
    this.checkLoginState();
  }
  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (!this.utilsService.networkStatus.connected) {
      this.utilsService.presentToastError(
        'Network disconnected. Please try to login while network available.'
      );
    }
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const loginData = { ...this.loginForm.value };
      this.authService.login(loginData);
    }
  }
  /**
   * declar - check login state
   */
  checkLoginState() {
    this.authService.authenticationState.subscribe((state) => {
      if (state) {
        this.router.navigate(['home']);
      }
    });
  }
  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
