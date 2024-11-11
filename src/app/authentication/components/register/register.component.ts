import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INPUT_MAX_LENGTH, INPUT_MIN_LENGTH, MAX_LENGTH_ERROR_MESSAGE, MIN_LENGTH_ERROR_MESSAGE, PASSWORD_MIN_LENGTH } from '../../models/constants';
import { AuthenticationService } from '../../services/authentication.service';
import { ActionResponse, RegistrationModel } from '../../models/view-models';
import { catchError, EMPTY, exhaustMap, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ONLY_LETTERS_VALIDATOR_IDENTIFIER, PASSWORD_VALIDATOR_IDENTIFIER, passwordValidator, stringContainsOnlyLettersValidator } from '../../validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  readonly USERNAME_FORM_CONTROL_NAME: string = 'username';
  readonly PASSWORD_FORM_CONTROL_NAME: string = 'password';
  readonly EMAIL_FORM_CONTROL_NAME: string = 'email';
  readonly FULLNAME_FORM_CONTROL_NAME: string = 'fullname';

  public registerFormGroup: FormGroup;

  get userNameFormControl(): AbstractControl {
    return this.registerFormGroup.get(this.USERNAME_FORM_CONTROL_NAME);
  }

  get passwordFormControl(): AbstractControl {
    return this.registerFormGroup.get(this.PASSWORD_FORM_CONTROL_NAME);
  }

  get emailFormControl(): AbstractControl {
    return this.registerFormGroup.get(this.EMAIL_FORM_CONTROL_NAME);
  }

  get fullNameFormControl(): AbstractControl {
    return this.registerFormGroup.get(this.FULLNAME_FORM_CONTROL_NAME);
  }

  get userNameErrorMessage(): string {
    if (this.userNameFormControl.hasError('required')) {
      return 'Username is required';
    }

    if(this.userNameFormControl.hasError('minlength')) {
      return MIN_LENGTH_ERROR_MESSAGE;
    }

    if(this.userNameFormControl.hasError('maxlength')) {
      return MAX_LENGTH_ERROR_MESSAGE;
    }

    return '';
  }

  get passwordErrorMessage(): string {
    if (this.passwordFormControl.hasError('required')) {
      return 'Password is required';
    }

    if(this.passwordFormControl.hasError('minlength')) {
      return 'You should enter at least 8 characters';
    }

    if(this.passwordFormControl.hasError('maxlength')) {
      return MAX_LENGTH_ERROR_MESSAGE;
    }

    if(this.passwordFormControl.hasError(PASSWORD_VALIDATOR_IDENTIFIER)) {
      return 'Password should contain at least 1 lowercase, 1 uppercase, 1 digit and 1 special character';
    }
    return '';
  }

  get emailErrorMessage(): string {
    if(this.emailFormControl.hasError('email')) {
      return 'You should enter a valid email (eg. abc@domain.com)';
    }

    if (this.emailFormControl.hasError('required')) {
      return 'Email is required';
    }

    return '';
  }

  get fullNameErrorMessage(): string {
    if(this.fullNameFormControl.hasError('minlength')) {
      return MIN_LENGTH_ERROR_MESSAGE;
    }

    if(this.fullNameFormControl.hasError('maxlength')) {
      return MAX_LENGTH_ERROR_MESSAGE;
    }

    if(this.fullNameFormControl.hasError(ONLY_LETTERS_VALIDATOR_IDENTIFIER)) {
      return 'Full name should contain only letters';
    }

    return '';
  }

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  registerUser(): void {
    if (this.registerFormGroup.valid) {
      of(EMPTY)
        .pipe(
          exhaustMap(() => this.authenticationService.registerUser(this.getRegistrationFormModel())),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 400) {
              this.openSnackBar(`Please fill in all required fields`);
            } else {
              this.openSnackBar(`An error occured. Please try again later`);
            }

            throw error;
          }),
          tap((response: ActionResponse) => {
            if (response.status === 'success') {
              this.openSnackBar('Successfully registered');
              this.clearForm();
            }
          })
        )
        .subscribe();
    }
  }

  private getRegistrationFormModel(): RegistrationModel {
    return {
      username: this.userNameFormControl.value,
      password: this.passwordFormControl.value,
      email: this.emailFormControl.value,
      fullname: this.fullNameFormControl.value
    };
  }

  private initializeForm() {
    this.registerFormGroup = this.formBuilder.group({
      [this.USERNAME_FORM_CONTROL_NAME]: ['', [Validators.required,
                                              Validators.minLength(INPUT_MIN_LENGTH),
                                              Validators.maxLength(INPUT_MAX_LENGTH)]],
      [this.PASSWORD_FORM_CONTROL_NAME]: ['', [Validators.required,
                                              Validators.minLength(PASSWORD_MIN_LENGTH),
                                              Validators.maxLength(INPUT_MAX_LENGTH),
                                              passwordValidator
                                              ]],
      [this.EMAIL_FORM_CONTROL_NAME]: ['', [Validators.email]],
      [this.FULLNAME_FORM_CONTROL_NAME]: ['',[Validators.minLength(INPUT_MIN_LENGTH),
                                              Validators.maxLength(INPUT_MAX_LENGTH),
                                              stringContainsOnlyLettersValidator]]
    })
  }

  private clearForm() {
    this.registerFormGroup.reset();
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
