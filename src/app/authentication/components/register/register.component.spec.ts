import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthenticationService } from '../../services/authentication.service';
import { of } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ONLY_LETTERS_VALIDATOR_IDENTIFIER, PASSWORD_VALIDATOR_IDENTIFIER } from '../../validators';

describe('RegisterComponent (Jest)', () => {
  let component: RegisterComponent;
  let authServiceMock: { registerUser: jest.Mock };

  beforeEach(() => {
    authServiceMock = {
      registerUser: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatButtonModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceMock }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.registerFormGroup).toBeDefined();
    expect(component.userNameFormControl.value).toEqual('');
    expect(component.passwordFormControl.value).toEqual('');
    expect(component.emailFormControl.value).toEqual('');
    expect(component.fullNameFormControl.value).toEqual('');
  });

  describe('UsernameControl', () => {
    beforeEach(() => {
      component.userNameFormControl.reset();
    });

    it('should validate required fields', () => {
      component.userNameFormControl?.setValue('');
      expect(component.userNameFormControl?.valid).toBeFalsy();
      expect(component.userNameFormControl?.errors).toEqual({ required: true });
    });
  });

  describe('PasswordControl', () => {
    beforeEach(() => {
      component.passwordFormControl.reset();
    });

    it('should validate strong password', () => {
      component.passwordFormControl.setValue('password');

      expect(component.passwordFormControl?.valid).toBeFalsy();
      expect(component.passwordFormControl?.errors).toEqual({ [PASSWORD_VALIDATOR_IDENTIFIER]: true });
    });
  });

  describe('EmailControl', () => {
    beforeEach(() => {
      component.emailFormControl.reset();
    });

    it('should validate a valid email', () => {
      component.emailFormControl?.setValue('email');

      expect(component.emailFormControl?.valid).toBeFalsy();
      expect(component.emailFormControl?.errors).toEqual({ 'email': true });
    });
  });

  describe('FullNameControl', () => {
    beforeEach(() => {
      component.fullNameFormControl.reset();
    });

    it('should validate full name contains only letters', () => {
      component.fullNameFormControl?.setValue('name1');

      expect(component.fullNameFormControl?.valid).toBeFalsy();
      expect(component.fullNameFormControl?.errors).toEqual({ [ONLY_LETTERS_VALIDATOR_IDENTIFIER]: true });
    });
  });

  it('should call the register method of AuthenticationService on form submit', () => {
    authServiceMock.registerUser.mockReturnValue(of(true));
    component.registerFormGroup.setValue({
      username: 'username',
      password: 'strongPassword1!',
      email: 'user@gmail.com',
      fullname: ''
    });

    component.registerUser();

    expect(authServiceMock.registerUser).toHaveBeenCalledWith(expect.objectContaining({
      username: 'username',
      password: 'strongPassword1!',
      email: 'user@gmail.com',
      fullname: ''
    }));
  });

  it('should not call the register method if the form is invalid', () => {
    component.registerFormGroup.setValue({
      username: 'username',
      password: '',
      email: '',
      fullname: ''
    });

    component.registerUser();

    expect(authServiceMock.registerUser).not.toHaveBeenCalled();
  });
});
