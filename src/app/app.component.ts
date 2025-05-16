import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  /*   providers: [
    {
      provide: CONFIG_TOKEN,useFactory: () => APP_CONFIG,

    }
  ] */
})
export class AppComponent {
  menuItems: { path: string; label: string }[] = [];
  isMenuOpen: boolean = false;

  constructor(
    public router: Router,
    private authService: AuthService
  ) {
    this.menuItems = routes
      .filter(route => route.data && route.data['label'])
      .map(route => ({
        path: '/' + route.path,
        label: route.data!['label'],
      }));
  }

  // Aktív menüpont ellenőrzése
  isActive(path: string): boolean {
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }

  logout(): void {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Hamburger menü megnyitása/zárása
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
