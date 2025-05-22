import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-message.component.html',
})
export class AlertMessageComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() message: string = '';
  @Input() closable: boolean = true;
  show: boolean = true;

  close() {
    this.show = false;
  }

  get alertClasses(): string {
    const base = 'rounded-md px-4 py-3 text-sm flex justify-between items-center';
    switch (this.type) {
      case 'success':
        return `${base} bg-green-100 text-green-800 border border-green-300`;
      case 'error':
        return `${base} bg-red-100 text-red-800 border border-red-300`;
      case 'warning':
        return `${base} bg-yellow-100 text-yellow-800 border border-yellow-300`;
      case 'info':
      default:
        return `${base} bg-blue-100 text-blue-800 border border-blue-300`;
    }
  }
}
