import {MatDialog} from "@angular/material/dialog";
import {VerificationDialogComponent} from "../../public/verification-dialog/verification-dialog.component";

export class ShowEmailWasSentDialog {
  constructor(private dialog: MatDialog, private value: any) {
    console.log(value);
    if (value.status === 200 || value.status === true) {
      this.dialog.open(VerificationDialogComponent, {
        data: {text: 'Email was sent successfully!'}
      });
    }
  }
}
