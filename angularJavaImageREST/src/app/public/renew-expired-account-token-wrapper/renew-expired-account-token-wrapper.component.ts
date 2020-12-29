import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VerificationDialogComponent} from "../verification-dialog/verification-dialog.component";
import {RenewExpiredAccountTokenComponent} from "../renew-expired-account-token/renew-expired-account-token.component";

@Component({
  selector: 'app-renew-expired-account-token-wrapper',
  templateUrl: './renew-expired-account-token-wrapper.component.html',
  styleUrls: ['./renew-expired-account-token-wrapper.component.scss']
})
export class RenewExpiredAccountTokenWrapperComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialog.open(RenewExpiredAccountTokenComponent, {
      width: '450px',
      maxWidth: '450px',
      minWidth: '280px',
      height: '300px',
      minHeight: '300px',
      maxHeight: '300px'
    });
  }

}
