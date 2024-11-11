import { FormControl, ValidationErrors } from "@angular/forms";

export const PASSWORD_VALIDATOR_IDENTIFIER: string = 'password';
export const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).+$/;

export function passwordValidator(control: FormControl): ValidationErrors {
  const { value } = control;

  if (!value) {
    return null;
  }

  if (PASSWORD_REGEXP.test(value) === false) {
    return { [PASSWORD_VALIDATOR_IDENTIFIER]: true };
  }

  return null;
}
