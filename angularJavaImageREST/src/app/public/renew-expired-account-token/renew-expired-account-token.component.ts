import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RenewAccountVerificationToken} from "../../shared/login/login.component";
import {UserAuthenticationService} from "../../serviceV2/user-authentication.service";
import {VerificationDialogComponent} from "../verification-dialog/verification-dialog.component";

@Component({
  selector: 'app-renew-expired-account-token',
  templateUrl: './renew-expired-account-token.component.html',
  styleUrls: ['./renew-expired-account-token.component.scss']
})
export class RenewExpiredAccountTokenComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RenewExpiredAccountTokenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RenewAccountVerificationToken,
              private authService: UserAuthenticationService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  renewToken() {
    this.authService
      .renewToken(
        {email: this.data.email, password: this.data.password}
      ).subscribe(value => {
      console.log(value);
      if (value.status === 200) {
        this.dialog.open(VerificationDialogComponent, {
          data: {text: 'Email was sent successfully!'}
        });
      }
    });
  }
}
