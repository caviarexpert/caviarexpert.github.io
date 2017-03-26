import { Component, OnInit, AfterViewInit } from "@angular/core";
//import { System } from "systemjs";
import "leaflet";
import { GeocodingService } from "./geocoding.service";


declare let L: any;
@Component({
  selector: "mapTap",
  moduleId: module.id,
  styleUrls: [],
  template: `<section id="map" style="height: 600px;"></section>`
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
          map = L.map("map").setView([52, 12], 4); 
          L.tileLayer("//{s}.osm.maptiles.xyz/{z}/{x}/{y}.png", {
            maxZoom: 19,
            //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
          map.on("click", function(event){      
            let zoom = map.getZoom();
            let newZoom = zoom < 10 ? zoom + 4 : zoom + 5;
            console.debug( "Zoom: ", zoom, " -> ", newZoom );
            console.log("latlng=", event.latlng.lat, ",", event.latlng.lng);
            map.flyTo( event.latlng, newZoom );
            geoService.getGeocoding(event.latlng.lat, event.latlng.lng);
          });
    //});
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}