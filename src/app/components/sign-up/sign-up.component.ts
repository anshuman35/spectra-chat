import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(/[\w_]+/)]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordsShouldMatch });

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) { }

  async signUp() {
    if (this.signUpForm.invalid) {
      return false;
    }

    await this.authService.register(this.signUpForm.get('username').value, this.signUpForm.get('password').value);
    this.snackBar.open('Succesfully registered', '', { duration: 3000, horizontalPosition: 'left' });
    this.router.navigate(['/']);
  }

  private passwordsShouldMatch(c: AbstractControl): { mismatch: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { mismatch: true };
    }

    return null;
  }

}
