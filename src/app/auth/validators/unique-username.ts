import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const username = control.value;
    return this.authService.checkUsername(username)
      .pipe(
        map(() => null),
        catchError((err) => {
          if (err.error.username) {
            return of({ nonUniqueUsername: true });
          }

          return of({ noConnection: true });
        })
      );
  };
}
