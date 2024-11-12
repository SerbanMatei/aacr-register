import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { AuthenticationService } from "../../services/authentication.service";
import { delay, exhaustMap, Observable, tap } from "rxjs";
import { ActionResponse, RegistrationModel } from "../../models/view-models";

export type RegisterStatus = 'notStarted' | 'success' | 'error';

export interface RegisterState {
  loading: boolean;
  status: RegisterStatus;
}

@Injectable()
export class RegisterStore extends ComponentStore<RegisterState> {

  constructor(
    private authenticationService: AuthenticationService
  ) {
    super({ loading: false, status: 'notStarted' });
  }

  readonly loading$ = this.select((state) => state.loading);
  readonly status$ = this.select((state) => state.status);

  readonly setLoading = this.updater((state, loading: boolean) => {
    return { ...state, loading };
  });

  readonly setStatus = this.updater((state, status: RegisterStatus) => {
    return { ...state, status };
  });

  registerUser = this.effect((credentials$: Observable<RegistrationModel>) =>
    credentials$.pipe(
      tap(() => this.setLoading(true)),
      delay(2000),
      exhaustMap((credentials) =>
        this.authenticationService.registerUser(credentials).pipe(
          tap({
            next: (response: ActionResponse) => {
              if (response.status === 'success') {
                this.setStatus('success');
              } else {
                this.setStatus('error');
              }

              this.setLoading(false);
            },
            error: (error) => {
              this.setStatus('error');
              this.setLoading(false);
            }
          })
        )
      )
    )
  )
}
