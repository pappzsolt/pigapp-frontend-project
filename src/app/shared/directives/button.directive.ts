import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appButton]',
  standalone: true,
  host: {
    '[class]': 'computedClasses',
  },
})
export class ButtonDirective {
  @Input() appButton: 'blue' | 'red' = 'blue';
  @Input() disabled = false;

  get computedClasses(): string {
    const base =
      'px-4 py-2 text-white rounded-md cursor-pointer transition-colors duration-200 focus:outline-none';
    const disabledClasses =
      'disabled:bg-gray-400 disabled:text-gray-200 disabled:hover:bg-gray-400 disabled:cursor-not-allowed';
    const colorClasses =
      this.appButton === 'red'
        ? 'bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-300'
        : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300';

    return `${base} ${colorClasses} ${disabledClasses}`;
  }
}
