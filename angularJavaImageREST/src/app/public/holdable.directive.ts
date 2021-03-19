import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {interval, Observable, Subject} from "rxjs";
import {filter, map, takeUntil, tap} from "rxjs/operators";

@Directive({
  selector: '[appHoldable]'
})
export class HoldableDirective {

  @Output() holdTime: EventEmitter<number> = new EventEmitter<number>();

  state: Subject<string> = new Subject<string>();

  cancel: Observable<string>;

  @Output() showProgessBar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.cancel = this.state.pipe(
      filter(stateValue => stateValue === 'cancel'),
      map(value => {
          console.log('Stopped..');
          this.holdTime.emit(0);
        this.showProgessBar.emit(false);
        return value;
      })
    )
  }


  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel');
    console.log('Come on');
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onHold() {
    console.log('Holding ...');

    this.state.next('start');
    const n = 100;

    interval(n)
      .pipe(
        takeUntil(this.cancel),
        tap(time => {
          this.showProgessBar.emit(true);
          this.holdTime.emit(time * 55)
        })
      ).subscribe();

  }


}
