import { Validators } from "@angular/forms";
import { INPUT_MAX_LENGTH, INPUT_MIN_LENGTH, PASSWORD_MIN_LENGTH } from "./common.constants";
import { alphanumericValidator, passwordValidator, stringContainsOnlyLettersValidator } from "../../validators";

export const USERNAME_FORM_CONTROL_NAME: string = 'username';
export const PASSWORD_FORM_CONTROL_NAME: string = 'password';
export const EMAIL_FORM_CONTROL_NAME: string = 'email';
export const FULLNAME_FORM_CONTROL_NAME: string = 'fullname';

export const REGISTRATION_FORM = {
  [USERNAME_FORM_CONTROL_NAME]: ['', [Validators.required,
                                      Validators.minLength(INPUT_MIN_LENGTH),
                                      Validators.maxLength(INPUT_MAX_LENGTH),
                                      alphanumericValidator]],
  [PASSWORD_FORM_CONTROL_NAME]: ['', [Validators.required,
                                      Validators.minLength(PASSWORD_MIN_LENGTH),
                                      Validators.maxLength(INPUT_MAX_LENGTH),
                                      passwordValidator
                                      ]],
  [EMAIL_FORM_CONTROL_NAME]: ['', [Validators.email]],
  [FULLNAME_FORM_CONTROL_NAME]: ['',[Validators.minLength(INPUT_MIN_LENGTH),
                                    Validators.maxLength(INPUT_MAX_LENGTH),
                                    stringContainsOnlyLettersValidator]]
}
