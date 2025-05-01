import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, Route } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
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
export class AppComponent implements OnInit {
  menuItems: { path: string; label: string }[] = [];

  constructor(public router: Router) {
    this.menuItems = routes
      .filter((route: Route) => route.data && route.data['label'])
      .map((route: Route) => ({
        path: '/' + route.path,
        label: route.data!['label'], // <-- Itt is []-es elérés kell
      }));
  }

  isActive(path: string): boolean {
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }

  ngOnInit() {}
}
