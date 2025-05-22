import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTailwindBlueBox]',
})
export class TailwindCardDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.addClasses();
  }

  private addClasses(): void {
    const classes = [
      'bg-blue-100',
      'dark:bg-gray-900',
      'p-6', // belső padding
      'rounded-2xl',
      'shadow-md',
      'fixed',
      'bottom-4', // kis térköz az ablak aljától
      'left-1/2',
      '-translate-x-1/2',
      'w-full',
      'max-w-md',
    ];

    classes.forEach(className => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }
}
