import {Component, OnInit} from '@angular/core';
import {MediaProcessorService} from "../../serviceV2/media-processor.service";
import {Device, DeviceObserverService} from "../../serviceV2/device-observer.service";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {parseArguments} from "@angular/cli/models/parser";
import {MatDialog} from "@angular/material/dialog";
import {VerificationDialogComponent} from "../verification-dialog/verification-dialog.component";
import {Subject} from "rxjs";
import {Overlay, OverlayPositionBuilder} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {LoadingComponent} from "../loading/loading.component";

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {

  public foo: string;
  public isMobileDevice: boolean;
  public isDesktopDeviceLg: boolean;
  public isDesktopDeviceXl: boolean;
  public isTabletDevice: boolean;
  public desktop: string = Device.DESKTOP;
  public tablet: Device.TABLET;
  public mobile: Device.MOBILE;
  isLoading$: Subject<boolean> = new Subject<boolean>();
  constructor(public media: MediaProcessorService,
              public deviceObserverService: DeviceObserverService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    this.isLoading$.next(true);
    this.route.paramMap
      .subscribe(param => {
        console.log(param.get('test'));
        /*this.dialog.open(VerificationDialogComponent);*/
      })

    /*this.deviceObserverService
      .getActiveDevice();*/

    this.media.$mediaGetter.subscribe(value => {
      console.log(value);
      value.filter(value1 => {
        if (value1.mqAlias === 'xs') {
          this.isMobileDevice = true;
          this.isDesktopDeviceLg = false;
          this.isTabletDevice = false;
          this.isDesktopDeviceXl = false;
        } else if (value1.mqAlias === 'sm') {
          this.isMobileDevice = false;
          this.isDesktopDeviceLg = false;
          this.isTabletDevice = true;
          this.isDesktopDeviceXl = false;
        } else if (value1.mqAlias === 'lg') {
          this.isMobileDevice = false;
          this.isDesktopDeviceLg = true;
          this.isTabletDevice = false;
          this.isDesktopDeviceXl = false;
        } else if(value1.mqAlias === 'xl') {
          this.isMobileDevice = false;
          this.isDesktopDeviceLg = false;
          this.isTabletDevice = false;
          this.isDesktopDeviceXl = true;
        }
      });
    });
  }

}
