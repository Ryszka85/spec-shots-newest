import {AfterViewInit, ComponentRef, Directive, Input} from '@angular/core';
import {Subject} from "rxjs";
import {Overlay, OverlayPositionBuilder, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {LoadingComponent} from "./loading/loading.component";

@Directive({
  selector: '[appLoadingDialog]'
})
export class LoadingDialogDirective implements AfterViewInit {

  @Input() isLoading: Subject<boolean>;

  private componentRef: ComponentRef<LoadingComponent>;

  overlayRef: OverlayRef;

  @Input() message: string = '';

  @Input() message2 = '';

  constructor(private overlay: Overlay,
              private posBuilder: OverlayPositionBuilder) { }

  ngAfterViewInit(): void {
    console.log("Hat gefunkt");
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.posBuilder
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
    this.isLoading.subscribe(isLoading => {
      console.log(isLoading);
      if (isLoading) {
        console.log("is Loading");
        const componentPortal = new ComponentPortal(LoadingComponent);
        this.componentRef = this.overlayRef.attach(componentPortal);
        this.componentRef.instance.message = this.message;
        this.componentRef.instance.message2 = this.message2;
      } else {
        console.log("close");
        this.overlayRef.detach();
      }
    });
  }



}
