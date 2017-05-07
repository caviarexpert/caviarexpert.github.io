import { Component, OnInit, AfterViewInit } from "@angular/core";
//import { System } from "systemjs";
//import L = require("leaflet");
import * as L from "leaflet";
import { GeocodingService } from "./geocoding.service";
import { AddressService } from "../shared.module";


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
          let southWest = new L.LatLng(34, -13),
              northEast = new L.LatLng(63, 29),
              bounds = new L.LatLngBounds(southWest, northEast);
          this.leafletMap = L.map("map").fitBounds(bounds);
          const map = this.leafletMap;

          map.addControl(new MyControl());
          //http://{s}.osm.maptiles.xyz/{z}/{x}/{y}.png
          L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
          map.on("click", function(event){      
            let zoom = map.getZoom();            
            if(zoom > 15){
              geoService.getGeocoding(event.latlng.lat, event.latlng.lng)
                .subscribe( results => {
                  let addr = results[0].formatted_address;
                  addrService.address = addr;
                  console.log("results: ", addr);
                });
            }else{              
              let newZoom = zoom < 10 ? zoom + 4 : zoom + 5;
              newZoom = newZoom > 18 ? 18 : newZoom;
              console.debug( "Zoom: ", zoom, " -> ", newZoom );
              console.log("latlng=", event.latlng.lat, ",", event.latlng.lng);
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
    //});
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}