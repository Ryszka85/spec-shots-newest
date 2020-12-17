import {Component, Inject, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {SelectImageState} from "../app-state/states/select-image.state";
import {ImageModel} from "../domain/imageModel/image.model";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-image-detail-view',
  templateUrl: './image-detail-view.component.html',
  styleUrls: ['./image-detail-view.component.scss']
})
export class ImageDetailViewComponent implements OnInit {

  @Select(SelectImageState.getSelectedLink) selectedImage: Observable<string>;
  link: string = '';
  panelOpenState: boolean;


  constructor(private dialogRef: MatDialogRef<ImageDetailViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ImageModel) { }

  ngOnInit(): void {

  }

  closeFullscreen() {
    this.dialogRef.close();
  }
}
