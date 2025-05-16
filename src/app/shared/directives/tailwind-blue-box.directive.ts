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
    const classes = ['bg-blue-100', 'dark:bg-gray-900', 'p-6', 'rounded-2xl', 'shadow-md'];

    classes.forEach(className => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }
}
