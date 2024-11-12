import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { EMAIL_FORM_CONTROL_NAME, FULLNAME_FORM_CONTROL_NAME, PASSWORD_FORM_CONTROL_NAME, REGISTRATION_FORM, USERNAME_FORM_CONTROL_NAME } from '../../models/constants';
import { RegistrationModel } from '../../models/view-models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getEmailErrorMessage, getFullNameErrorMessage, getPasswordErrorMessage, getUsernameErrorMessage } from '../../utils/validation-form';
import { RegisterStore } from './register.store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  readonly USERNAME_FORM_CONTROL_NAME = USERNAME_FORM_CONTROL_NAME;
  readonly PASSWORD_FORM_CONTROL_NAME = PASSWORD_FORM_CONTROL_NAME;
  readonly EMAIL_FORM_CONTROL_NAME = EMAIL_FORM_CONTROL_NAME;
  readonly FULLNAME_FORM_CONTROL_NAME = FULLNAME_FORM_CONTROL_NAME;

  registerFormGroup: FormGroup;
  usernameErrorMessage: string;
  passwordErrorMessage: string;
  emailErrorMessage: string;
  fullNameErrorMessage: string;
  hidePassword: boolean = true;

  loading$ = this.registerStore.loading$;
  registerStatus$ = this.registerStore.status$;

  get userNameFormControl(): AbstractControl {
    return this.registerFormGroup.get(USERNAME_FORM_CONTROL_NAME);
  }

  get passwordFormControl(): AbstractControl {
    return this.registerFormGroup.get(PASSWORD_FORM_CONTROL_NAME);
  }

  get emailFormControl(): AbstractControl {
    return this.registerFormGroup.get(EMAIL_FORM_CONTROL_NAME);
  }

  get fullNameFormControl(): AbstractControl {
    return this.registerFormGroup.get(FULLNAME_FORM_CONTROL_NAME);
  }

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public registerStore: RegisterStore
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeControlsErrorsCheck();
    this.initializeRegisterStatusChange();
  }

  registerUser(): void {
    if (this.registerFormGroup.valid) {
      this.registerStore.registerUser(this.getRegistrationFormModel());
    }
  }

  private initializeRegisterStatusChange() {
    this.registerStatus$.subscribe(status => {
      if (status === 'success') {
        this.openSnackBar('Successfully registered');
        this.clearForm();
      } else if (status === 'error') {
        this.openSnackBar(`An error occured. Please try again later`);
      }
    });
  }

  private getRegistrationFormModel(): RegistrationModel {
    return {
      username: this.userNameFormControl.value,
      password: this.passwordFormControl.value,
      email: this.emailFormControl.value,
      fullname: this.fullNameFormControl.value
    };
  }

  private clearForm() {
    this.registerFormGroup.reset();
    this.registerFormGroup.clearValidators();
    this.registerFormGroup.updateValueAndValidity();
  }

  private initializeForm() {
    this.registerFormGroup = this.formBuilder.group(REGISTRATION_FORM)
  }

  private initializeControlsErrorsCheck() {
    this.userNameFormControl.statusChanges.subscribe(status => {
      if(status === 'INVALID') {
        this.usernameErrorMessage = getUsernameErrorMessage(this.userNameFormControl);
      }
    });


    this.passwordFormControl.statusChanges.subscribe(status => {
      if(status === 'INVALID') {
        this.passwordErrorMessage = getPasswordErrorMessage(this.passwordFormControl);
      }
    });

    this.emailFormControl.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.emailErrorMessage = getEmailErrorMessage(this.emailFormControl);
      }
    });

    this.fullNameFormControl.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.fullNameErrorMessage = getFullNameErrorMessage(this.fullNameFormControl);
      }
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
