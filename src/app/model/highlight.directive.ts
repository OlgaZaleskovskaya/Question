import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighLight]'
})

export class HighLightDirective {
    constructor(private el: ElementRef){}
    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('#5594E4', "white", " inset 1px 1px 2px 0px rgba(0,0,0,0.75)");
      }
     
      @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null, "black",'none');
      }
     
      private highlight(backgroundColor: string, textColor: string, shadow: string) {
        this.el.nativeElement.style.backgroundColor = backgroundColor;
        this.el.nativeElement.style.color = textColor;
        this.el.nativeElement.style.boxShadow = shadow;
      }
  }
