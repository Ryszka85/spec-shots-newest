import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingImageService {
  public isLoading$: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
