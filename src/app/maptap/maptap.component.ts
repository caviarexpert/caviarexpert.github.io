import { Component, OnInit, AfterViewInit } from "@angular/core";
//import { System } from "systemjs";
//import L = require("leaflet");
import * as L from "leaflet";
import { GeocodingService } from "../shared/geocoding.service";
import { AddressService } from "../shared/address.service";
import { GeocodeResult, GeocodeResponse } from "../shared/geocode";


@Component({
  selector: "map-tap",
  moduleId: module.id,
  styleUrls: ["./maptap.css"],
  //styles: [`.lc.leaflet-control { cursor: crosshair }`],
  template: `<section id="map" class="leaflet-crosshair"></section>`
})
export class MaptapComponent implements OnInit, AfterViewInit{
  constructor(geocodingService : GeocodingService, public addressService : AddressService ){
    this.geocodingService = geocodingService;
  }
  leafletMap : any;
  geocodingService : GeocodingService;
  ngAfterViewInit() {
    //System.import("leaflet").then( m => {
          
          let geoService = this.geocodingService;
          let addrService = this.addressService;

          var MyControl = L.Control.extend({
              options: {
                  position: 'topright'
              },

              onAdd: function (map) {
                  // create the control container with a particular class name
                  var container = L.DomUtil.create('div', 'lc');
                  
                  container.innerHTML = "HELLO!!!";
                  container.style.cursor = "crosshair";
                  L.DomUtil.disableTextSelection();
                  // ... initialize other DOM elements, add listeners, etc.

                  return container;
              }
          });

          //this.leafletMap = L.map("map").setView([52, 12], 4);
          const markersLayer = new L.LayerGroup([]);
          this.leafletMap = L.map("map");
          const map = this.leafletMap;

          map.addControl(new MyControl());
          markersLayer.addTo(map);
          //http://{s}.osm.maptiles.xyz/{z}/{x}/{y}.png
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 17,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
          map.on("click", function(event){      
            let zoom = map.getZoom();            
            if(zoom > 15){
              geoService.getGeocoding(event.latlng.lat, event.latlng.lng)
                .subscribe( results => {
                  let geocodeResponse : GeocodeResponse = new GeocodeResponse(results);
                  let geocodeResult : GeocodeResult = geocodeResponse.results[0];
                  let addr = geocodeResult.formatted_address;
                  addrService.assignAddress(geocodeResult);
                  console.log("results: ", results);
                  addrService.coordinate = event.latlng;
                  markersLayer.clearLayers();
                  let marker = L.marker(addrService.coordinate);
                  markersLayer.addLayer(marker);
                  marker.bindPopup(addrService.address.formattedAddress).openPopup();
                });
            }else{              
              let newZoom = zoom < 10 ? zoom + 4 : zoom + 5;
              newZoom = newZoom > 17 ? 17 : newZoom;
              map.flyTo( event.latlng, newZoom );
            }           
          });

          map.on('zoomend', function() {
              if(map.getZoom() > 15){
                L.DomUtil.addClass(L.DomUtil.get("map"), "pointer");
              }else{
                L.DomUtil.removeClass(L.DomUtil.get("map"), "pointer");
              }
          });
          var southWest = new L.LatLng(33, -17),
          northEast = new L.LatLng(62, 32),
          bounds = new L.LatLngBounds(southWest, northEast);
          //map.setView({lat:51.505, lng: -0.09}, 13, {animation:true});
          //map.setView([52, 12], 4)
          map.fitBounds(bounds);
          if(addrService.coordinate){
              let marker = L.marker(addrService.coordinate);
              markersLayer.addLayer(marker);
              marker.bindPopup(addrService.address.formattedAddress).openPopup();
          }
    //});
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}