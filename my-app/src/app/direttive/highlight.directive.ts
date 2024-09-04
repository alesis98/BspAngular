import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges{
  @Input() appHighlight: string = "";
  @Input() coloreDefault: string = "";


  constructor(private elementRef: ElementRef) { 
     
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighlight']) {
      this.cambiaColore(this.appHighlight);
    }
  }

 
  /* @HostListener('mouseenter') onMouseEnter(){
    this.cambiaColore(this.appHighlight || this.coloreDefault || "purple");
  }


  @HostListener('mouseleave') onMouseLeave(){
    this.cambiaColore("transparent");
  } */

  cambiaColore(colore: string){
    this.elementRef.nativeElement.style.backgroundColor = colore;
  }
}
