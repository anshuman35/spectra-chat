import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  async logIn() {
    this.authService.logIn(this.username, this.password).then(() => {
      this.router.navigate(['/messages']);
    }).catch(error => {
      let message = 'Unable to sign in. Please retry';
      if (error.status === 401) {
        message = 'Incorrect username or password';
      }
      this.snackBar.open(message, '', { duration: 3000, horizontalPosition: 'left' })
    });
  }

}
