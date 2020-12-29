import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VerificationDialogComponent} from "../verification-dialog/verification-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {UserAuthenticationService} from "../../serviceV2/user-authentication.service";

@Component({
  selector: 'app-verification-dialog-wrapper',
  templateUrl: './verification-dialog-wrapper.component.html',
  styleUrls: ['./verification-dialog-wrapper.component.scss']
})
export class VerificationDialogWrapperComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {


    console.log("DUDDEEE");
    this.route.paramMap
      .subscribe(param => {
        if (param.get('type') === 'email') {
          this.dialog.open(VerificationDialogComponent, {
            width: '450px',
            maxWidth: '450px',
            minWidth: '280px',
            height: '300px',
            minHeight: '300px',
            maxHeight: '300px',
            data: { text: 'Email was send successfully.' }
          });
        } else {
          this.dialog.open(VerificationDialogComponent, {
            width: '450px',
            maxWidth: '450px',
            minWidth: '280px',
            height: '300px',
            minHeight: '300px',
            maxHeight: '300px',
            data: { text: 'Account has been verified!' }
          });
        }

        /*this.dialog.open(VerificationDialogComponent);*/
      })

  }
}


export interface VerificationData {
  text: string;
}


