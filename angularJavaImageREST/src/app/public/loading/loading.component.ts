import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Overlay, OverlayPositionBuilder} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  message = '';

  message2 = '';

  constructor() { }

  ngOnInit(): void {
  }

}
