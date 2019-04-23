import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[dropdownOpen]'
})
export class DropDownDirective {
    @HostBinding('class.show') activeClass = false;
   constructor(elementRef: ElementRef, renderer: Renderer2 ) {
   }
   @HostListener('click') onclick(){
     this.activeClass = !this.activeClass
   } 
  }