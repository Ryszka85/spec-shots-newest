import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {SearchByTagState} from "../../shared/app-state/states/search-by-tag.state";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {SearchViewModel} from "../search-toolbar/search-view.model";
import {debounceTime} from "rxjs/operators";
import {QueryTagAction} from "../../shared/app-state/actions/query-tag-action";

@Component({
  selector: 'app-custom-search-bar',
  templateUrl: './custom-search-bar.component.html',
  styleUrls: ['./custom-search-bar.component.scss']
})
export class CustomSearchBarComponent implements OnInit {
  formControl = new FormControl({ scope: 'Tags', queryString: '' });

  clickedFilterDetails = false;
  @Output() openCloseSearchOptions: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() enterPressed: EventEmitter<string> = new EventEmitter<string>();

  constructor(private store: Store) { }
  ngOnInit(): void {


  }

  search(value: string) {

  }

}
