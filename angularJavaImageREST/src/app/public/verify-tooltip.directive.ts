import {AfterViewInit, ComponentRef, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {VerifyTooltipComponent} from "./verify-tooltip/verify-tooltip.component";
import {Select, Store} from "@ngxs/store";
import {RequestStatusState} from "../shared/app-state/states/request-status.state";
import {UserAuthenticationService} from "../serviceV2/user-authentication.service";
import {Subject} from "rxjs";
import {ShowEmailWasSentDialog} from "../shared/util/ShowEmailWasSentDialog";
import {RequestMessageAction} from "../shared/app-state/actions/request-message.action";

@Directive({
  selector: '[appVerifyTooltip]'
})
export class VerifyTooltipDirective implements OnInit, AfterViewInit {

  @Select(RequestStatusState.getStatusCode) $requestStatusCode;
  @Input('appVerifyTooltip') text = '';
  overlayRef: OverlayRef;

  @Input() email = '';

  @Input() password = '';

  @Input() close: Subject<boolean> = new Subject<boolean>();

  @Input() open: Subject<boolean> = new Subject<boolean>();

  constructor(private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef,
              private overlay: Overlay,
              public store: Store) {}

  ngOnInit() {
    this.store.dispatch(new RequestMessageAction(null))
    /*this.overlay.scrollStrategies.close().disable();
    this.overlay.position().global().dispose();*/
    const positionStrategy = this.overlayPositionBuilder
      // Create position attached to the elementRef
      .flexibleConnectedTo(this.elementRef)
      // Describe how to connect overlay to the elementRef
      // Means, attach overlay's center bottom point to the
      // top center point of the elementRef.
      .withPositions([{
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });


  }

  ngAfterViewInit(): void {
    this.close.subscribe(value => {
      console.log(value);
      if (value) {
        console.log("Closed pressed");
        this.overlayRef.detach();
        this.overlayRef = null;
      }
    })

    this.$requestStatusCode.subscribe(val => {


      if (val === 423) {
        console.log(this.email);
        console.log(this.password);
        const tooltipRef: ComponentRef<VerifyTooltipComponent>
          = this.overlayRef.attach(new ComponentPortal(VerifyTooltipComponent));

        this.overlayRef.backdropClick().subscribe(() => console.log("clicked"));
        console.log(this.overlayRef.backdropElement);
        tooltipRef.instance.text = this.text;
        tooltipRef.instance.email = this.email;
        tooltipRef.instance.password = this.password;
        tooltipRef.instance.close.subscribe(close => {
          if (close) {
            console.log("Closed pressed");
            this.overlayRef.detach();
            this.overlayRef = null;
          }
        })

      } else {
        console.log("Closed pressed");
        /*this.overlayRef.detach();*/

      }
    })
  }



  /*@HostListener('mouseenter')
  show() {

    const tooltipRef: ComponentRef<VerifyTooltipComponent>
      = this.overlayRef.attach(new ComponentPortal(VerifyTooltipComponent));
    tooltipRef.instance.text = this.text;
  }*/

  /*@HostListener('mouseout')
  hide() {
    this.overlayRef.detach();
  }*/

}
