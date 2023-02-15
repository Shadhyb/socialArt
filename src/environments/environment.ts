// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL:'https://63ecf73fbe929df00cb6306d.mockapi.io/api/',
  firebaseConfig : {
    databaseURL: "https://bearts-81e0c-default-rtdb.europe-west1.firebasedatabase.app",
    apiKey: "AIzaSyANFqY0RuotF1gx4zR3ejy298vVDlo493g",
    authDomain: "bearts-81e0c.firebaseapp.com",
    projectId: "bearts-81e0c",
    storageBucket: "bearts-81e0c.appspot.com",
    messagingSenderId: "821035433359",
    appId: "1:821035433359:web:895689f5fe1ab6d19edffa"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
