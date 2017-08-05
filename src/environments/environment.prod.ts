import * as aws from "./aws.json";

export const environment = {
  production: true,
  apiUrl: (<any>aws).api_url.value,
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
    paymentUrl: "/paypal"
  },
  postmen : {
    quotationUrl : "/postmen"
  },
  invoice : {
    path : "/invoice"
  }
};
