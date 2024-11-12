import { FormControl, ValidationErrors } from '@angular/forms';

const LETTERS_REGEXP = /^[a-zA-Z. ]*$/;

export const ONLY_LETTERS_VALIDATOR_IDENTIFIER: string = 'onlyLetters';
export function stringContainsOnlyLettersValidator(control: FormControl): ValidationErrors {
  const { value } = control;

  if (!value) {
    return null;
  }

  if (LETTERS_REGEXP.test(value) === false) {
    return { [ONLY_LETTERS_VALIDATOR_IDENTIFIER]: true };
  }

  return null;
}
