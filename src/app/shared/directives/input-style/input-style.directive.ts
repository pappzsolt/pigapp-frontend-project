import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputStyle]',
  standalone: true
})
export class InputStyleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'p-2');
    this.renderer.addClass(this.el.nativeElement, 'border');
    this.renderer.addClass(this.el.nativeElement, 'border-gray-300');
    this.renderer.addClass(this.el.nativeElement, 'rounded-md');
    this.renderer.addClass(this.el.nativeElement, 'focus:ring-2');
    this.renderer.addClass(this.el.nativeElement, 'focus:ring-blue-400');
  }
}
