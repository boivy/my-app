import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../classes/UserLogin';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  // Initialize the model for binding
  user = new UserLogin();

  constructor(private router: Router) {}

  onLogin() {
    if (this.user.username.trim().length < 4 || !this.user.password) return;
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/lazyinfor']);



  }
}


