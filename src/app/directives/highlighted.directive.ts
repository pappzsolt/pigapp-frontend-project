import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlighted]'
})
export class HighlightedDirective {

@Input('appHighlighted')
isHighlighted = false;

  constructor() {
    console.log("dierctives created");
  }

  @HostBinding('class.appHighlighted')
  get cssClasses(){
    return this.isHighlighted;
  }
  @HostListener('mouseover')
  mouseOver(){
    this.isHighlighted = true;
  }

  @HostListener('mouseleave')
  mouseLeave(){
    this.isHighlighted = false;
  }
}


