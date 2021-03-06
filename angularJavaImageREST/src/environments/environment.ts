// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8880/image-app/' /*'http://192.168.0.197:8880/image-app/'*/,
  google_id: 'XXX',
  galleryAspectRatio: 1.0869, downloadAspectRatio: 1.7910,
  desktopGalleryWidth: 500, desktopGalleryHeight: 460,
  tabletGalleryWidth: 300, tabletGalleryHeight: 300 / 1.0869,
  mobileGalleryWidth: 135, mobileGalleryHeight: 135 / 1.0869,
  desktopDownloadWidth: 1200, desktopDownloadHeight: 670,
  tabletDownloadWidth: 450, tabletDownloadHeight: 450 / 1.0869,
  mobileDownloadWidth: 250, mobileDownloadHeight: 250 / 1.0869
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
