import { AbstractControl } from "@angular/forms";
import { MAX_LENGTH_ERROR_MESSAGE, MIN_LENGTH_ERROR_MESSAGE } from "../models/constants";
import { ALPHANUMERIC_VALIDATOR_IDENTIFIER, ONLY_LETTERS_VALIDATOR_IDENTIFIER, PASSWORD_VALIDATOR_IDENTIFIER } from "../validators";

export function getUsernameErrorMessage(usernameFormControl: AbstractControl): string {
  if (usernameFormControl.hasError('required')) {
    return 'Username is required';
  }

  if(usernameFormControl.hasError('minlength')) {
    return MIN_LENGTH_ERROR_MESSAGE;
  }

  if(usernameFormControl.hasError('maxlength')) {
    return MAX_LENGTH_ERROR_MESSAGE;
  }

  if(usernameFormControl.hasError(ALPHANUMERIC_VALIDATOR_IDENTIFIER)) {
    return 'Username accepts only alphanumeric characters';
  }
  return '';
}

export function getPasswordErrorMessage(passwordFormControl: AbstractControl): string {
  if (passwordFormControl.hasError('required')) {
    return 'Password is required';
  }

  if(passwordFormControl.hasError('minlength')) {
    return 'You should enter at least 8 characters';
  }

  if(passwordFormControl.hasError('maxlength')) {
    return MAX_LENGTH_ERROR_MESSAGE;
  }

  if(passwordFormControl.hasError(PASSWORD_VALIDATOR_IDENTIFIER)) {
    return 'Password should contain at least 1 lowercase, 1 uppercase, 1 digit and 1 special character';
  }
  return '';
}

export function getEmailErrorMessage(emailFormControl: AbstractControl): string {
  if(emailFormControl.hasError('email')) {
    return 'You should enter a valid email (eg. abc@domain.com)';
  }

  if (emailFormControl.hasError('required')) {
    return 'Email is required';
  }

  return '';
}

export function getFullNameErrorMessage(fullNameFormControl: AbstractControl): string {
  if(fullNameFormControl.hasError('minlength')) {
    return MIN_LENGTH_ERROR_MESSAGE;
  }

  if(fullNameFormControl.hasError('maxlength')) {
    return MAX_LENGTH_ERROR_MESSAGE;
  }

  if(fullNameFormControl.hasError(ONLY_LETTERS_VALIDATOR_IDENTIFIER)) {
    return 'Full name should contain only letters';
  }

  return '';
}
