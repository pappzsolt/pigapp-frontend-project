import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="message || error"
      class="p-4 rounded-xl shadow-md mb-4 transition-opacity duration-300"
      [ngClass]="{
        'bg-green-100 text-green-800': message,
        'bg-red-100 text-red-800': error
      }"
    >
      <strong class="font-semibold">
        {{ message ? '✅ Siker:' : '❌ Hiba:' }}
      </strong>
      <p>{{ message || error }}</p>
    </div>
  `,
})
export class AlertComponent {
  @Input() message: string | null = null;
  @Input() error: string | null = null;
}
