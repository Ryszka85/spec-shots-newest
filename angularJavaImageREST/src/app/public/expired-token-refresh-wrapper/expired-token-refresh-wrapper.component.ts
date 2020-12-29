import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ExpiredTokenRefreshDialogComponent} from "../expired-token-refresh-dialog/expired-token-refresh-dialog.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-expired-token-refresh-wrapper',
  templateUrl: './expired-token-refresh-wrapper.component.html',
  styleUrls: ['./expired-token-refresh-wrapper.component.scss']
})
export class ExpiredTokenRefreshWrapperComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dialog.open(ExpiredTokenRefreshDialogComponent)
  }

}
