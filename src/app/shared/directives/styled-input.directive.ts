import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStyledInput]'
})
export class StyledInputDirective implements OnInit {
  @Input() widthClass: string = 'w-full'; // alapértelmezett szélesség

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const baseClasses = [
      'p-2',
      'border',
      'border-gray-300',
      'rounded-md',
      'focus:ring-2',
      'focus:ring-blue-400'
    ];

    // Alap Tailwind osztályok hozzáadása
    baseClasses.forEach(className => {
      this.renderer.addClass(this.el.nativeElement, className);
    });

    // Szélesség osztály hozzáadása, ha van
    if (this.widthClass) {
      this.renderer.addClass(this.el.nativeElement, this.widthClass);
    }
  }
}


