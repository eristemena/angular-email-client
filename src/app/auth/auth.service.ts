import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  checkUsername(username: string): Observable<ValidationErrors> {
    return this.httpClient.post<ValidationErrors>('https://api.angular-email.com/auth/username', { username })
  }
}
