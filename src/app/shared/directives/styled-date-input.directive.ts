import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appStyledDateInput]',
  standalone: true,
})
export class StyledDateInputDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const input = this.el.nativeElement as HTMLInputElement;

    if (input.type === 'date') {
      this.renderer.addClass(input, 'px-4');
      this.renderer.addClass(input, 'py-[10px]'); // 🔧 padding-top & bottom: 10px
      this.renderer.addClass(input, 'my-[20px]'); // 🔧 margin-top & bottom: 20px
      this.renderer.addClass(input, 'border');
      this.renderer.addClass(input, 'border-red-500'); // 🔴 Piros szegély
      this.renderer.addClass(input, 'rounded-md');
      this.renderer.addClass(input, 'text-red-600'); // 🔴 Piros szöveg
      this.renderer.addClass(input, 'placeholder-red-400'); // 🔴 Piros placeholder
      this.renderer.addClass(input, 'w-full');
      this.renderer.addClass(input, 'sm:w-auto');
      this.renderer.addClass(input, 'focus:outline-none');
      this.renderer.addClass(input, 'focus:ring-2');
      this.renderer.addClass(input, 'focus:ring-red-500'); // 🔴 Piros fókuszgyűrű
    }
  }
}
