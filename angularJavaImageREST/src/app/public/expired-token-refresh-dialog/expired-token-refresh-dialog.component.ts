import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {UserAuthenticationService} from "../../serviceV2/user-authentication.service";
import {VerificationDialogComponent} from "../verification-dialog/verification-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-expired-token-refresh-dialog',
  templateUrl: './expired-token-refresh-dialog.component.html',
  styleUrls: ['./expired-token-refresh-dialog.component.scss']
})
export class ExpiredTokenRefreshDialogComponent implements OnInit {

  formGroup: any;
  public emailFormField = new FormControl('');
  public passwordFormField = new FormControl('');

  constructor(private formBuilder: FormBuilder,
              private authService: UserAuthenticationService,
              private dialog: MatDialog) {
    this.formGroup = this.formBuilder.group({
      email: this.emailFormField,
      password: this.passwordFormField
    });
  }

  ngOnInit(): void {
  }

  get mail(): string {
    return this.formGroup.get('email').value;
  }

  get pwd(): string {
    return this.formGroup.get('password').value;
  }

  renewToken() {
    this.authService
      .renewToken({email: this.mail, password: this.pwd})
      .subscribe(value => {
        if (value.status === 200) {
          this.dialog.open(VerificationDialogComponent, {
            data: {text: 'Email was sent successfully!'}
          });
        }
      });
  }
}
