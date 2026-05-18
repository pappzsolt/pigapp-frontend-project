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

    // MODERN SAAS SELECT STYLE
    const baseClasses: string[] = [
      // layout
      'block',
      'w-full',
      'min-w-0',

      // sizing
      'h-11',
      'min-h-[44px]',

      // spacing
      'px-4',
      'pr-10',

      // typography
      'text-sm',
      'font-medium',
      'text-gray-800',

      // visuals
      'bg-white',
      'border',
      'border-gray-300',
      'rounded-xl',
      'shadow-sm',

      // browser reset
      'appearance-none',

      // transitions
      'transition-all',
      'duration-200',

      // focus
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-blue-100',
      'focus:border-blue-500',

      // dark mode
      'dark:bg-gray-800',
      'dark:text-white',
      'dark:border-gray-600',
      'dark:focus:ring-blue-400/30',
      'dark:focus:border-blue-400',

      // font
      'font-sans',
    ];

    baseClasses.forEach(cls => this.renderer.addClass(select, cls));

    // Optional extra width class
    if (this.widthClass?.trim()) {
      this.renderer.addClass(select, this.widthClass);
    }

    // FONT RENDERING
    this.renderer.setStyle(select, 'font-family', 'Inter, ui-sans-serif, system-ui, sans-serif');

    this.renderer.setStyle(select, 'font-feature-settings', 'normal');

    this.renderer.setStyle(select, 'font-size', '14px');

    this.renderer.setStyle(select, 'font-variation-settings', 'normal');

    this.renderer.setStyle(select, 'line-height', '20px');

    this.renderer.setStyle(select, 'tab-size', '4');
  }
}
