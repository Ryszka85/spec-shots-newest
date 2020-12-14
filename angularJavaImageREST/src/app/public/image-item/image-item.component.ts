import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ImageModel} from "../../shared/domain/imageModel/image.model";
import {SelectImage} from "../../shared/app-state/actions/image.action";
import {ChangeImageDetailsDialogComponent} from "../../private/change-image-details-dialog/change-image-details-dialog.component";
import {Store} from "@ngxs/store";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent implements OnInit {
  @Input() image: ImageModel;
  @Input() rowHeight = 1;
  @Input() gutterSize = 1;
  @ViewChild('img') img: ElementRef;
  public rows = 0;

  constructor(private store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize')
  calculateRows() {
    console.log(this.img.nativeElement.offsetHeight);
    this.rows = Math.floor(
      this.img.nativeElement.offsetHeight / (this.rowHeight + this.gutterSize)
    );
    console.log('rows calculated : ' + this.rows);
  }
}


export interface ImageViewModel {
  src: string;
  alt?: string;
}
