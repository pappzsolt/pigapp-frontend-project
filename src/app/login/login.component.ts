// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: response => {
        this.authService.saveJwtRefresh(response.refresh);
        this.authService.saveJwtToken(response.access);
        this.error = '';
        this.router.navigate(['/home']);
      },
      error: err => {
        this.error = 'Hibás e-mail vagy jelszó';
      },
    });
  }
}
