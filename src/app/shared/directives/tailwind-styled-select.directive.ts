import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTailwindStyledSelect]',
  standalone: true,
})
export class TailwindStyledSelectDirective implements AfterViewInit {
  @Input('appTailwindStyledSelect') widthClass?: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const select: HTMLSelectElement = this.el.nativeElement;

    // Alap Tailwind osztályok szélesség nélkül
    const baseClasses: string[] = [
      'block',
      'px-4',
      'py-2',
      'text-base',
      'text-gray-800',
      'bg-white',
      'border',
      'border-gray-300',
      'rounded-2xl',
      'shadow-sm',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:border-blue-500',
      'transition',
      'ease-in-out',
      'duration-150',
      'dark:bg-gray-800',
      'dark:text-white',
      'dark:border-gray-600',
      'dark:focus:ring-blue-400',
      'dark:focus:border-blue-400',
      'font-sans',
    ];

    baseClasses.forEach(cls => this.renderer.addClass(select, cls));

    // Csak akkor adunk szélességosztályt, ha van értelmes érték
    if (this.widthClass?.trim()) {
      this.renderer.addClass(select, this.widthClass);
    }

    // Egyedi stílusok
    this.renderer.setStyle(select, 'font-family', 'Inter, ui-sans-serif, system-ui, sans-serif');
    this.renderer.setStyle(select, 'font-feature-settings', 'normal');
    this.renderer.setStyle(select, 'font-size', '14px');
    this.renderer.setStyle(select, 'font-variation-settings', 'normal');
    this.renderer.setStyle(select, 'line-height', '20px');
    this.renderer.setStyle(select, 'tab-size', '4');
  }
}
