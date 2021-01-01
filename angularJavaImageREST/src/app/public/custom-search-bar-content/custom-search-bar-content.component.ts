import {
  Component,
  ElementRef, EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild
} from '@angular/core';
import {MatFormFieldControl} from "@angular/material/form-field";
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl} from "@angular/forms";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {MatInput} from "@angular/material/input";
import {Select, Store} from "@ngxs/store";
import {SearchByTagState} from "../../shared/app-state/states/search-by-tag.state";
import {SearchViewModel} from "../search-toolbar/search-view.model";
import {debounceTime, tap} from "rxjs/operators";
import {QueryTagAction} from "../../shared/app-state/actions/query-tag-action";
import {UserDetailsActions} from "../../shared/app-state/actions/user-details.action";
import SearchUsers = UserDetailsActions.SearchUsers;
import {SearchByUsersState} from "../../shared/app-state/states/search-by-users.state";
import {BaseUserDetails} from "../../shared/domain/userModel/user-details.model";

export interface SearchBarContent {
  queryString: string;
  scope: string;
}

@Component({
  selector: 'app-custom-search-bar-content',
  templateUrl: './custom-search-bar-content.component.html',
  styleUrls: ['./custom-search-bar-content.component.scss'],
  providers: [{
    provide: MatFormFieldControl,
    useExisting: CustomSearchBarContentComponent
  }]
})
export class CustomSearchBarContentComponent implements OnInit, OnDestroy,
  MatFormFieldControl<SearchBarContent>, ControlValueAccessor {

  @Select(SearchByTagState.getFetchedTagListAsOption) $tagOptions: Observable<SearchViewModel[]>;

  @Select(SearchByUsersState.getFetchedUsers) $users: Observable<BaseUserDetails[]>;

  @Output() enterPressed: EventEmitter<SearchBarContent> = new EventEmitter<SearchBarContent>();

  @Output() clickPressed: EventEmitter<SearchBarContent> = new EventEmitter<SearchBarContent>();

  @Output() valueChanged: EventEmitter<SearchBarContent> = new EventEmitter<SearchBarContent>();

  searchTerm$ = new Subject<string>();

  /*this.searchTerm$
    .pipe(debounceTime(1000))
    .subscribe(value => {
      switch (this.searchOption) {
        case 'Tags':
          this.store.dispatch(new QueryTagAction(new BehaviorSubject(value)))
          break;
        case 'Users':
          this.store.dispatch(new SearchUsers(new BehaviorSubject(value)))
          break;
      }
    });*/



  @ViewChild(MatInput, {read: ElementRef, static: true})
  input: ElementRef;




  static nextId = 0;

  autofilled: boolean;
  controlType: string;

  @Input()
  disabled: boolean;

  errorState: boolean;
  focused = true;
  @HostBinding() id = `custom-form-field-id-${CustomSearchBarContentComponent.nextId++}`;
  /*ngControl: NgControl | null;*/



  @Input()
  required: boolean;

  onChange: (value: SearchBarContent) => void;
  onTouch: () => void;

  private _placeholder: string;

  stateChanges = new Subject<void>();

  form: FormGroup;

  constructor(private focusMonitor: FocusMonitor,
              @Optional() @Self() public ngControl: NgControl,
              private formBuilder: FormBuilder,
              private store: Store) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.form = this.formBuilder.group({
      scope: new FormControl(''),
      queryString: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.focusMonitor
      .monitor(this.input)
      .subscribe(focused => {
        this.focused = !!focused;
        this.stateChanges.next();
      });

    this.clickPressed.subscribe(val => console.log(val))


    this.form.valueChanges.subscribe(value1 => this.valueChanged.emit(value1));



    this.searchTerm$
      .pipe(debounceTime(1000))
      .subscribe(value => {
        switch (this.form.value.scope) {
          case 'Tags':
            this.store.dispatch(new QueryTagAction(new BehaviorSubject(value)))
            break;
          case 'Users':
            this.store.dispatch(new SearchUsers(new BehaviorSubject(value)))
            break;
        }
      });
  }

  @Output()
  get val(): SearchBarContent {
    return this.form.value;
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }

  get empty(): boolean {
    return !this.value.queryString && !this.value.scope;
  }

  @Input()
  public set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  public get placeholder(): string {
    return this._placeholder;
  }

  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return true;
  }

  @Input()
  set value(value: SearchBarContent) {
    this.form.patchValue(value);
    this.stateChanges.next();
  }

  get value() {
    return this.form.value;
  }



  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete();
  }

  registerOnChange(fn: any): void {
    this.onTouch = fn;
  }

  registerOnTouched(fn: any): void {
    this.onChange = fn;
  }

  writeValue(value: SearchBarContent): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.form.disable();
    this.stateChanges.next();
  }


  search(value: string) {

  }
}
