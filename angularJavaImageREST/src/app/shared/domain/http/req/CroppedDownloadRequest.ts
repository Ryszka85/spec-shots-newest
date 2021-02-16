
export interface CroppedDownloadRequest {
  imageId: string;
  offsetX: number;
  offsetY: number;
  subImageWidth: number;
  subImageHeight: number;
  selectedWidth?: number;
  selectedHeight?: number;
  possibleResolutions?: Array<string>;
}

export interface CroppedDownloadReq {
  imageId: string;
  offsetX: number;
  offsetY: number;
  subImageWidth: number;
  subImageHeight: number;
  selectedWidth?: number;
  selectedHeight?: number;
}

