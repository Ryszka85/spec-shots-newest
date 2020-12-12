import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginComponent} from "../../shared/login/login.component";
import {FileUploadComponent} from "../file-upload/file-upload.component";
import {Location} from "@angular/common";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationActions} from "../../shared/app-state/actions/authentication-action";
import LoggedUserDetails = AuthenticationActions.LoggedUserDetails;
import {UploadImageDialogComponent} from "../upload-image-dialog/upload-image-dialog.component";
import {MediaObserver} from "@angular/flex-layout";
import {Device} from "../../serviceV2/device-observer.service";

@Component({
  selector: 'app-file-upload-wrapper',
  templateUrl: './file-upload-wrapper.component.html',
  styleUrls: ['./file-upload-wrapper.component.scss']
})
export class FileUploadWrapperComponent implements OnInit {


  device: string;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private store: Store,
              private media: MediaObserver) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(param => {
        const userId = param.get('userId');
        this.store.dispatch(new LoggedUserDetails(userId))
        const ref = new MatDialogConfig();
        // this.dialog.open(UploadImageDialogComponent,
        //   {
        //     width: '900px',
        //     height: '750px',
        //     disableClose: true,
        //     autoFocus: false,
        //     data: userId
        //   });

        this.media.asObservable().subscribe(value => this.device = value[0].mqAlias);

        const isMobile = this.device === Device.MOBILE || this.device === Device.TABLET;
        this.dialog.open(FileUploadComponent,
          {
            width: '1300px',
            height: '950px',
            disableClose: true,
            autoFocus: false,
            data: userId
          });
      });
  }
}
