export const environment = {
  production: false,
  googleMapApiKey: "AIzaSyCT8piTVujZwgJctZBoS8HHSYkXg20xyos",
  googleMapApiUrl: "https://maps.googleapis.com/maps/api/geocode/json",
  //http://{s}.osm.maptiles.xyz/{z}/{x}/{y}.png
  //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  //let osmTemplate = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
  mapTilesUrlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  stripeApiKey: "pk_test_ZvEKUPqFjIepuviNVuDVZJXN",
  processCardUrl: "https://localhost:8443/charge"
};