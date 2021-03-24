import { Router } from '@angular/router';
import { ApiService } from './../../shared/services/api.service';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  currentUser: any;
  updatePasswordForm: FormGroup;
  toogleType: boolean = true;
  ctoogleType: boolean = true;
  formSubmitted = false;
  error_messages = {
    newPassword: [
      { type: 'required', message: 'Please Enter New Password.' },
      { type: 'minlength', message: 'Please Enter Min 6 Character.' },
      { type: 'maxlength', message: 'Please Enter Min 10 Character.' },
    ],
    confirmpassword: [
      { type: 'required', message: 'Please Enter New Password.' },
      { type: 'minlength', message: 'Please Enter Min 6 Character.' },
      { type: 'maxlength', message: 'Please Enter Min 10 Character.' },
    ],
  };
  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.updatePasswordForm = new FormGroup(
      {
        username: new FormControl('', []),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
        confirmpassword: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
          ])
        ),
      },
      {
        validators: this.password.bind(this),
      }
    );
  }
  ionViewWillEnter() {
    this.authService.userDetails().then((res: any) => {
      this.apiService.getDistributorDetails(res.user).subscribe((res) => {
        this.currentUser = res.distributor;
      });
    });
  }

  submit() {
    this.formSubmitted = true;
    this.updatePasswordForm.controls["username"].setValue(this.currentUser._id);
    if (this.updatePasswordForm.valid) {
      this.authService.updatePassword(this.updatePasswordForm.value);
      this.router.navigate(['home/dashboard']);
    }
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('newPassword');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
