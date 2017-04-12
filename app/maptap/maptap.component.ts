/// <reference path="../html.d.ts" />
import { Component, OnInit, AfterViewInit } from "@angular/core";
//import { System } from "systemjs";
import  * as template from "./maptap.css";
import L = require("leaflet");
import { GeocodingService } from "./geocoding.service";


@Component({
  selector: "mapTap",
  moduleId: module.id,
  //styleUrls: ["./maptap.css"],
  styles: [template+''],
  template: `<section id="map" style="height: 600px;" class="leaflet-crosshair"></section>`
})
export class MapTapComponent implements OnInit, AfterViewInit{
  constructor(geocodingService : GeocodingService){
    this.geocodingService = geocodingService;
  }
  leafletMap : any;
  geocodingService : GeocodingService;
  ngAfterViewInit() {
    //System.import("leaflet").then( m => {
          let map = this.leafletMap;
          let geoService = this.geocodingService;

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

          

          map = L.map("map").setView([52, 12], 4);

          map.addControl(new MyControl());
          //http://{s}.osm.maptiles.xyz/{z}/{x}/{y}.png
          L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
          map.on("click", function(event){      
            let zoom = map.getZoom();            
            if(zoom > 15){
              geoService.getGeocoding(event.latlng.lat, event.latlng.lng);
            }else{              
              let newZoom = zoom < 10 ? zoom + 4 : zoom + 5;
              newZoom = newZoom > 18 ? 18 : newZoom;
              console.debug( "Zoom: ", zoom, " -> ", newZoom );
              console.log("latlng=", event.latlng.lat, ",", event.latlng.lng);
              map.flyTo( event.latlng, newZoom );
            }           
          });
    //});
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}