// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  weatherApiKey: 'bf5c438f70d77dc96129e5133f74b10e',
  gpsApiKey: 'c98d843d39b648db955c3864876a5510',
  weaherCompleteUrl: 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&exclude=hourly,daily&appid={APIkey}&units=metric',
  gpsCompleteUrl: 'http://api.positionstack.com/v1/forward?access_key=YOUR_ACCESS_KEY&query=YOUR_ADDRESS&limit=1&output=json'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
