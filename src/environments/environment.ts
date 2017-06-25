// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  googleMapApiKey: "AIzaSyCT8piTVujZwgJctZBoS8HHSYkXg20xyos",
  googleMapApiUrl: "https://maps.googleapis.com/maps/api/geocode/json",
  //http://{s}.osm.maptiles.xyz/{z}/{x}/{y}.png
  //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  //let osmTemplate = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
  mapTilesUrlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  stripe : {
    apiKey: "pk_test_ZvEKUPqFjIepuviNVuDVZJXN",
    processCardUrl: "https://localhost:8443/process-card",
    chargeCardUrl: "https://localhost:8443/charge-card"
  },
  paypal : {
    createPaymentUrl: "https://localhost:8443/paypal/create-payment",
    executePaymentUrl: "https://localhost:8443/paypal/execute-payment"
  },
  postmen : {
    quotationUrl : "https://localhost:8443/delivery-quote"
  }
};
