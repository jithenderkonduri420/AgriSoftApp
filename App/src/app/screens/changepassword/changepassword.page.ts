import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  updatePasswordForm: FormGroup;
  toogleType: boolean = true;
  ctoogleType: boolean = true;
  formSubmitted = false;
  error_messages = {
    'newPassword': [
      { type: 'required', message: 'Please Enter New Password.' },
      { type: 'minlength', message: 'Please Enter Min 6 Character.' },
      { type: 'maxlength', message: 'Please Enter Min 10 Character.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'Please Enter New Password.' },
      { type: 'minlength', message: 'Please Enter Min 6 Character.' },
      { type: 'maxlength', message: 'Please Enter Min 10 Character.' },

    ],
  }
  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.updatePasswordForm = new FormGroup(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
        confirmpassword: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10)
        ])),
      }, {
        validators: this.password.bind(this)
      });
  }

  submit() {
    this.formSubmitted = true;
    if (this.updatePasswordForm.valid) {
      let formObj = this.updatePasswordForm.value;
      // this.authService.updatePassword(formObj).subscribe(res => {
      //   this.utilsService.presentToastSuccess('Password has been changed successfully');
      //   this.router.navigate(['/login']);
      // });
    }
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('newPassword');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
