import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-verification-dialog',
  templateUrl: './verification-dialog.component.html',
  styleUrls: ['./verification-dialog.component.scss']
})
export class VerificationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VerificationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {text: string}) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
