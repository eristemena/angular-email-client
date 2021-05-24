import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SignupCredential {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface UsernameAvailableResponse {
  available: boolean;
}

export interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com/auth';

  constructor(private httpClient: HttpClient) {}

  checkUsername(username: string): Observable<UsernameAvailableResponse> {
    return this.httpClient.post<UsernameAvailableResponse>(
      `${this.rootUrl}/username`,
      { username }
    );
  }

  signUp(credentials: SignupCredential) {
    return this.httpClient.post<SignupResponse>(
      `${this.rootUrl}/signup`,
      credentials
    );
  }
}
