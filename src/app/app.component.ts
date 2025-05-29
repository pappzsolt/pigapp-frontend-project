import { FooterComponent } from './shared/footer/footer.component';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuItems: { path: string; label: string }[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.menuItems = routes
      .filter(route => route.data && route.data['label'])
      .map(route => ({
        path: '/' + route.path,
        label: route.data!['label'],
      }));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
