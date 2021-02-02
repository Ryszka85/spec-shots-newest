import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAuthenticationService} from "../../serviceV2/user-authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {ShowEmailWasSentDialog} from "../../shared/util/ShowEmailWasSentDialog";
import {Store} from "@ngxs/store";
import {RequestMessageAction} from "../../shared/app-state/actions/request-message.action";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-verify-tooltip',
  templateUrl: './verify-tooltip.component.html',
  styleUrls: ['./verify-tooltip.component.scss']
})
export class VerifyTooltipComponent implements OnInit {

  @Input() text = '';

  @Input() email = '';

  @Input() password = '';

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: UserAuthenticationService,
              private dialog: MatDialog,
              private store: Store,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.close.emit(false);
  }

  closeToolTip() {
    this.close.emit(true);
    this.store
      .dispatch(new RequestMessageAction({message: '', status: 0}));
  }

  sendEmail() {
    console.log(this.email);
    console.log(this.password);
    this.authService
      .renewToken(
        {email: this.email, password: this.password}
      ).subscribe(value => {
      this.snackBar.open(
        'Email was sent successfully',
        'Check your inbox',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
      /*var showEmailWasSentDialog = new ShowEmailWasSentDialog(this.dialog, value);*/
      this.closeToolTip();
    });
  }
}
