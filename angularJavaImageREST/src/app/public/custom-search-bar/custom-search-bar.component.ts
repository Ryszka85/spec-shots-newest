import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {SearchByTagState} from "../../shared/app-state/states/search-by-tag.state";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {SearchViewModel} from "../search-toolbar/search-view.model";
import {debounceTime} from "rxjs/operators";
import {QueryTagAction} from "../../shared/app-state/actions/query-tag-action";
import {SearchBarContent} from "../custom-search-bar-content/custom-search-bar-content.component";


export interface PressedSearchContent {
  content: SearchBarContent;
  clicked: boolean;
}

@Component({
  selector: 'app-custom-search-bar',
  templateUrl: './custom-search-bar.component.html',
  styleUrls: ['./custom-search-bar.component.scss']
})
export class CustomSearchBarComponent implements OnInit {
  content = new FormControl({ scope: 'Tags', queryString: '' });

  contentTemp: SearchBarContent;

  @Input() disableIcon = false;

  clickedFilterDetails = false;
  @Output() openCloseSearchOptions: EventEmitter<PressedSearchContent> = new EventEmitter<PressedSearchContent>();

  @Output() enterPressed: EventEmitter<SearchBarContent> = new EventEmitter<SearchBarContent>();

  @Output() changedValue: EventEmitter<PressedSearchContent> = new EventEmitter<PressedSearchContent>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.contentTemp = this.content.value;
  }

  search(value: string) {

  }

  emitOpenOptions() {
    this.clickedFilterDetails = !this.clickedFilterDetails;
    this.openCloseSearchOptions.emit({content: this.contentTemp, clicked: this.clickedFilterDetails});
  }

  foo($event: any) {
    this.contentTemp = $event;
    if (this.contentTemp.scope === 'Users') this.clickedFilterDetails = false;
    this.changedValue.emit({content: this.contentTemp, clicked: this.clickedFilterDetails});
  }
}
