import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SidebarMenuRightItem {
  label: string;
  route?: string;      // opcionális, ha routerLink-et akarsz
  icon?: string;       // opcionális (pl. ikon class)
  badge?: string | number; // opcionális jelvény (pl. darabszám)
}

@Component({
  selector: 'app-sidebarmenuright',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebarmenuright.component.html',
  styleUrls: ['./sidebarmenuright.component.css'],
})
export class SidebarmenurightComponent {
  @Input() title: string = 'Menü';
  @Input() items: SidebarMenuRightItem[] = [
    { label: 'Közelgő kiadások', route: '/upcomingcosts' },
  ];
}
