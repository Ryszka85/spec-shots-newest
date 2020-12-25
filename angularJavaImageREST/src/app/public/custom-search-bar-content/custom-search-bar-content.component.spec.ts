import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchBarContentComponent } from './custom-search-bar-content.component';

describe('CustomSearchBarContentComponent', () => {
  let component: CustomSearchBarContentComponent;
  let fixture: ComponentFixture<CustomSearchBarContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSearchBarContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSearchBarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
