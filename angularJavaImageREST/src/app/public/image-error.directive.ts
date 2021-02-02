import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appImageError]'
})
export class ImageErrorDirective implements OnInit {
  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {

    console.log();
  }

  @HostListener('error') onError(){
    this.el.nativeElement.src = 'assets/account2.png';
  }
}


