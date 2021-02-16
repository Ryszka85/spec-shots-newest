import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {UploadImageModel} from "../shared/domain/imageModel/upload-image.model";
import {SetImageWithTags} from "../shared/domain/imageModel/image.model";
import {tap} from "rxjs/operators";
import {Store} from "@ngxs/store";
import {ImageRecognitionTags} from "../shared/app-state/actions/image.action";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private readonly UPLOAD_IMAGE = environment.apiUrl + "images/insert/";
  private readonly VALIDATE_IMAGE = environment.apiUrl + "library/validate-image/";

  constructor(private http: HttpClient, private store: Store) {
  }

  public addToUserLibrary(uploadModel: UploadImageModel): Observable<any> {
    let request: FormData = new FormData();
    request.append("file", uploadModel.orgFile);
    request.append("userId", uploadModel.userId);
    request.append("urlReference", uploadModel.urlReference);
    request.append("isPublic", uploadModel.isPublic);
    request.append('galleryFile', uploadModel.galleryFile);
    request.append("downloadFile", uploadModel.downloadFile);
    if (uploadModel.tags.length > 0) {
      let tags: string = '';
      uploadModel.tags
        .forEach(tagName => {
          tags += tagName + "-";
        })
      request.append("tags", tags)

    }
    console.log(uploadModel.urlReference);
    return this.http.post(
      this.UPLOAD_IMAGE, request,
      {observe: 'response'});
  }

  public validateImage(data: File): Observable<ImageValidationResponse> {
    let request: FormData = new FormData();
    request.append("file", data);
    return this.http.post<ImageValidationResponse>(
      this.VALIDATE_IMAGE,
      request,
      {responseType: 'json'})
      .pipe(
        tap(response =>
          this.store.dispatch(new ImageRecognitionTags(response.tags))
        )
      );
  }
}


export interface ImageValidationResponse {
  message?: string;
  status: number;
  width: number;
  height: number;
  tags: Array<string>

}
