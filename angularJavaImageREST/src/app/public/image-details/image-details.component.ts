import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectImageState} from "../../shared/app-state/states/select-image.state";
import {ImageDownloadService} from "../../serviceV2/image-download.service";
import {
  CropAndDownload,
  GetDownloadDetails, GetImageAsByse64,
  GetImageByImageId,
  GetRelatedImagesByTagIDs,
  ImagesByTagsAction
} from "../../shared/app-state/actions/image.action";
import {DownloadDetailsState} from "../../shared/app-state/states/download-details.state";
import {GetImageByIdState} from "../../shared/app-state/states/get-image-by-id.state";
import {Subject} from "rxjs";
import {UserDetailsState} from "../../shared/app-state/states/User-details.state";
import {ImagesByTagNameQueryImpl} from "../../shared/domain/imageModel/ImagesByTagNameQuery";
import {RelatedImagesState} from "../../shared/app-state/states/related-images.state";
import {MatDialog} from "@angular/material/dialog";
import {ImageCropperComponent} from "../../private/image-cropper/image-cropper.component";
import {CropImageState} from "../../shared/app-state/states/crop-image.state";
import {ImageRequestService} from "../../serviceV2/image-request.service";
import {DownloadCropperComponent} from "../download-cropper/download-cropper.component";
import {SetResolutionDownloadDialogComponent} from "../set-resolution-download-dialog/set-resolution-download-dialog.component";
import {DomSanitizer} from "@angular/platform-browser";
import {MatListItem} from "@angular/material/list";
import {ImageFileDetails} from "../../shared/domain/imageModel/image-file-details";

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {

  @ViewChild('downloadItem') downloadItem: ElementRef;

  clickedDownloadResolution: ImageFileDetails = {width: 0, height: 0, downloadLink: '', size: 0, contentType: ''};
  toggle: boolean = false;

  // @Select(DownloadDetailsState.getFile) $selectedImage;
  @Select(RelatedImagesState.getRelatedImages) $relatedImages;
  @Select(UserDetailsState.profileImgPath) $profileImg;
  @Select(DownloadDetailsState.getDetails) $downloadDetails;
  @Select(GetImageByIdState.getImageDetail) $selectedImage;
  formattedDetails = new Subject<string[]>();
  private imageId: string;


  testImg: any


  constructor(private store: Store,
              private route: ActivatedRoute,
              private downloadService: ImageDownloadService,
              private dialog: MatDialog,
              private service: ImageRequestService,
              private router: Router,
              private sanitizer: DomSanitizer) {
    this.testImg = this.sanitizer.bypassSecurityTrustStyle(`url(${this.store.selectSnapshot(GetImageByIdState.getImageDetail).link})`);
  }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(param => {
        const imageId = param.get('imageId');
        this.imageId = imageId;
        console.log(this.imageId);
      });
  }

  download(detail: any) {
    console.log(detail);
    const imageId = this.store.selectSnapshot(GetImageByIdState.getImageDetail).imageId;
    console.log(detail);
    this.store
      .dispatch(new GetDownloadDetails(imageId, detail))
      .subscribe(value1 => {
        console.log(value1.downloadDetails);
        window.location.href = value1.downloadDetails.downloadLink;
        this.store
          .dispatch(new GetImageByImageId(this.imageId));
      });
    // window.location.href = detail.downloadLink;
  }

  clickedTag(tag: string) {
    this.store.dispatch(
      new ImagesByTagsAction(new ImagesByTagNameQueryImpl(tag))
    );
  }

  appendFileSizeName(index: number): string {
    switch (index) {
      case 0:
        return 'Original ';
      case 1:
        return 'XLarge ';
      case 2:
        return 'Large ';
      case 3:
        return 'Small ';
    }
  }

  cropImageForDownload(imageDetail: any) {
    console.log(imageDetail);
    const imageId = this.store.selectSnapshot(GetImageByIdState.getImageDetail).imageId;
    this.store.dispatch(new GetImageByImageId(imageId));
    this.store.dispatch(new GetImageAsByse64(imageId));
    this.router
      .navigate(['crop-download', {imageId: imageId}]);
    console.log(imageDetail);
    // this.service
    //   .getImageBytes(imageId)
    //   .subscribe(byteArray => {
    //     let blob = new Blob([byteArray],{type:'application/octet-binary'});
    //     let reader = new FileReader();
    //     reader.onload = (evt: any) => {
    //       this.store
    //         .dispatch(new CropAndDownload(evt.target.result))
    //       this.router
    //         .navigate(['crop-download', {imageId: imageId}])
    //     };
    //     // this.dialog.open(DownloadCropperComponent,{
    //     //   data: { img: evt.target.result,
    //     //     width: imageDetail.width,
    //     //     height: imageDetail.height, viewName: 'Download' }
    //     // })
    //     reader.readAsDataURL(blob);
    //   })
  }

  getIndividualResolutionDownloadDialog(imageDetail: any) {
    console.log(imageDetail);
    this.dialog.open(SetResolutionDownloadDialogComponent, {
      width: '450px',
      height: '460px',
      panelClass: 'setIndividualResDialog'
    });
  }

  OpenDownloadBox(detail: ImageFileDetails) {
    this.clickedDownloadResolution = this.clickedDownloadResolution.width === detail.width ? this.clickedDownloadResolution : detail;
    this.toggle = this.clickedDownloadResolution.width === detail.width;
  }
}
