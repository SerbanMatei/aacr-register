import { FormControl, ValidationErrors } from '@angular/forms';

const ALPHANUMERIC_REGEXP = /^[a-zA-Z0-9_]*$/;

export const ALPHANUMERIC_VALIDATOR_IDENTIFIER: string = 'onlyLetters';
export function alphanumericValidator(control: FormControl): ValidationErrors {
  const { value } = control;

  if (!value) {
    return null;
  }

  if (ALPHANUMERIC_REGEXP.test(value) === false) {
    return { [ALPHANUMERIC_VALIDATOR_IDENTIFIER]: true };
  }

  return null;
}
