import { Component, OnInit } from '@angular/core';
import {ImagesByTagsAction} from "../../shared/app-state/actions/image.action";
import {
  ImagesByTagNameQueryImpl,
  ImagesByTagNameWithFilterOpt
} from "../../shared/domain/imageModel/ImagesByTagNameQuery";
import {TagRequestService} from "../../serviceV2/tag-request.service";
import {TagModel} from "../../shared/domain/tagModel/tag-model";
import {Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.scss']
})
export class TagViewComponent implements OnInit {
  tags: TagModel[] = [];


  constructor(public tagReqService: TagRequestService,
              private store: Store) { }

  ngOnInit(): void {

    this.tagReqService
      .getAllTags()
      .subscribe(value => this.tags = value);
    /*this.store.dispatch(
      new ImagesByTagsAction(new ImagesByTagNameQueryImpl(tag))
    );*/
  }


  showTagImages(tag: TagModel) {
    this.store.dispatch(new ImagesByTagsAction(
      new ImagesByTagNameWithFilterOpt(null, tag.tag)))
      .subscribe(value => {
        console.log(value);
        this.store.dispatch(new Navigate(['/image-by-tags']))
      });
  }
}
