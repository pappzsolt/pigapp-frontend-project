import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuService } from '../services/sidebar-menu.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-sidebar-menu',
  imports: [CommonModule,],
  standalone: true,
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  constructor(
    private authService: AuthService,
    private sidebarMenuService: SidebarMenuService
  ) {}

ngOnInit(): void {}
}
