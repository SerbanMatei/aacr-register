import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionResponse, RegistrationModel } from '../models/view-models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  public registerUser(registerModel: RegistrationModel): Observable<ActionResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<ActionResponse>('/register', registerModel, {
      headers,
      responseType: 'json'
    });
  }
}
