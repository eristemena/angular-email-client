import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup(
    {
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        asyncValidators: [this.uniqueUsername.validate],
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    {
      validators: [this.matchPasswordValidator.validate],
    }
  );

  constructor(
    private matchPasswordValidator: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService
  ) {}

  getFormControl(name: string): FormControl {
    return this.signupForm.get(name) as FormControl;
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('onSubmit');
    this.authService
      .signUp({
        username: this.getFormControl('username').value,
        password: this.getFormControl('password').value,
        passwordConfirmation: this.getFormControl('confirmPassword').value,
      })
      .subscribe((value) => {
        console.log(value);
      });
  }
}
