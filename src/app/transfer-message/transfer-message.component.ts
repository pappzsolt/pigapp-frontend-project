import { Component, Input } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-transfer-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="p-4 rounded-xl shadow-md mb-4" [ngClass]="bgClass" [@fadeInOut]>
      {{ message }}
    </div>
  `,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class TransferMessageComponent {
  @Input() message: string | null = null;

  get bgClass() {
    if (!this.message) return '';
    if (this.message.startsWith('✅')) return 'bg-green-100 text-green-800';
    if (this.message.startsWith('❌')) return 'bg-red-100 text-red-800';
    if (this.message.startsWith('⚠️')) return 'bg-yellow-100 text-yellow-800';
    return '';
  }
}
