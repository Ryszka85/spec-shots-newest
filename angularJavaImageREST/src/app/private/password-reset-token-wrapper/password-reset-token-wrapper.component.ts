import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-password-reset-token-wrapper',
  templateUrl: './password-reset-token-wrapper.component.html',
  styleUrls: ['./password-reset-token-wrapper.component.scss']
})
export class PasswordResetTokenWrapperComponent implements OnInit {

  constructor(private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("HUUUUUUUUUUUUUUUU");
    this.route.paramMap.subscribe(value => console.log(value))
  }

}
