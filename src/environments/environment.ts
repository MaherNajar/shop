// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCuYAd5eyVzqVPULsqOJDUXD8JG6UVnbsY',
    authDomain: 'omyperles.firebaseapp.com',
    databaseURL: 'https://omyperles.firebaseio.com',
    projectId: 'omyperles',
    storageBucket: 'omyperles.appspot.com',
    messagingSenderId: '356149938324',
    appId: '1:356149938324:web:c6fb13f64f5093fad10c81',
    measurementId: 'G-JW9429M95E',
  },
  imgNotAvailable:
    'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/colliers%2Fphoto%20indisponible.jpg?alt=media&token=76e7878a-6326-41f7-b1e1-83f94242358d',
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
