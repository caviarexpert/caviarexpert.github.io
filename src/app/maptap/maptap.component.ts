import { Component, OnInit, AfterViewInit, AfterContentInit, ViewEncapsulation, ViewChild, ContentChild, ElementRef } from "@angular/core";
//import { System } from "systemjs";
//import L = require("leaflet");
import * as L from "leaflet";
import { GeocodingService } from "../shared/geocoding.service";
import { AddressService } from "../shared/address.service";
import { AddressFormattedComponent } from "./address-formatted.component";
import { MapControlComponent } from "./map-control.component";
import { GeocodeResult, GeocodeResponse } from "../shared/geocode";
import { TranslationService } from "angular-l10n";


@Component({
  selector: "map-tap",
  moduleId: module.id,
  styleUrls: ["./maptap.css"],
  //styles: [`.lc.leaflet-control { cursor: crosshair }`],
  template: `<section id="map" class="leaflet-crosshair"></section>
  <address-formatted style="display:none">My address</address-formatted>
  <map-control style="display:none"></map-control>`,
  //encapsulation: ViewEncapsulation.None,
})
export class MaptapComponent implements OnInit, AfterViewInit, AfterContentInit{
  constructor(public geocodingService : GeocodingService, 
      public addressService : AddressService,
      private translationService: TranslationService){}

  @ViewChild(AddressFormattedComponent) addressFormatted : AddressFormattedComponent;
  @ViewChild(MapControlComponent) mapControl : MapControlComponent;
  
  leafletMap : any ;
  addressPopupHtml: L.Popup;
  //geocodingService : GeocodingService;
  private _lang: string;

  private markersLayer = new L.LayerGroup([]);

  ngAfterContentInit() {
    
  }

  ngAfterViewInit() {
    //System.import("leaflet").then( m => {
          this.addressPopupHtml = L.popup()
                    .setContent(this.addressFormatted.getHtml());

          let geoService = this.geocodingService;
          let addrService = this.addressService;
          let tranlateService = this.translationService;
          let addressPopup = this.addressPopupHtml;
          

          //this.leafletMap = L.map("map").setView([52, 12], 4);
          
          this.leafletMap = L.map("map");
          const map = this.leafletMap;
          const markersLayer = this.markersLayer;
          //let addressPopup = this.getAddressPopup;
          

          map.addControl(this.getControl());
          this.markersLayer.addTo(map);
          //http://{s}.osm.maptiles.xyz/{z}/{x}/{y}.png
          //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
          //let osmTemplate = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
          let osmTemplate = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
          L.tileLayer(osmTemplate, {
            maxZoom: 17,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
          map.on("click", function(event){      
            let zoom = map.getZoom();            
            if(zoom > 15){
              geoService.getAddress(event.latlng.lat, event.latlng.lng)
                .subscribe( results => {
                  let geocodeResponse : GeocodeResponse = new GeocodeResponse(results);
                  let geocodeResult : GeocodeResult = geocodeResponse.results[0];
                  let addr = geocodeResult.formatted_address;                  
                  console.log("results: ", results);
                  addrService.coordinate = event.latlng;
                  addrService.assignMapclick(geocodeResult);
                  markersLayer.clearLayers();
                  let marker = L.marker(addrService.coordinate);
                  markersLayer.addLayer(marker);
                  marker.bindPopup(addressPopup).openPopup();
                  //marker.bindPopup(addressPopup()).openPopup();
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
          map.on("load", () => {
              this.addAddressMarker();
          });
         
          
          //map.setView({lat:51.505, lng: -0.09}, 13, {animation:true});
          //map.setView([52, 12], 4)
          map.fitBounds(this.getViewport());
          if(addrService.coordinate){
              
          }
    //});
  }
  private getControl(){
      let MyControl = L.Control.extend({
              options: {
                  position: 'topright'
              },
              onAdd : (map) => {
                  // create the control container with a particular class name
                  var container = L.DomUtil.create('div', 'lc');
                  //container.innerHTML = this.mapControl.getHtml();
                  container.appendChild(this.mapControl.getHtml());
                  container.style.cursor = "crosshair";
                  L.DomUtil.disableTextSelection();
                  // ... initialize other DOM elements, add listeners, etc.

                  return this.mapControl.getHtml();
              }
          });

          return new MyControl();    
  }

  private __getControl(){
      let MyControl = L.Control.extend({
              options: {
                  position: 'topright'
              },
              onAdd : (map) => {
                  // create the control container with a particular class name
                  var container = L.DomUtil.create('div', 'lc');
                  container.innerHTML = this.translationService.translate("HELLO");
                  container.style.cursor = "crosshair";
                  L.DomUtil.disableTextSelection();
                  // ... initialize other DOM elements, add listeners, etc.

                  return container;
              }
          });

          return new MyControl();
  }
  private getAddressPopup = () : string => {
    let _lang = this.geocodingService.getSharedLocale().getCurrentLanguage();
    let localCountryName = this.geocodingService.getSharedTranslation().translate("COUNTRY." + this.addressService.address.countryCode);
    console.log("Address popup for", localCountryName, _lang);
    return `<p>${this.addressService.address.formattedAddress}</p>
            <address>
            ${this.addressService.address.route} ${this.addressService.address.buildingNumber}<br />
            ${this.addressService.address.postalCode} ${this.addressService.address.locality} ${this.addressService.address.areaLevel2Short}<br />
            ${localCountryName}
            </address>
            <button (click)="alert(111)">${this.translationService.translate("HELLO")}</button>`;
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.    
  }

  private addAddressMarker() {
      let marker;
      if(this.addressService.coordinate){
        marker = L.marker(this.addressService.coordinate);
      }else{
        if(this.addressService.address!=null &&
          this.addressService.address.geocodeResult!=null &&
          this.addressService.address.geocodeResult.geometry.location_type=="ROOFTOP"){
            marker = L.marker(this.addressService.address.geocodeResult.geometry.location);
        }
      }
      if(marker!=null){
        this.markersLayer.addLayer(marker);
        //marker.bindPopup(this.getAddressPopup()).openPopup();
        let popup = L.popup()
          .setContent(this.addressFormatted.getHtml());
        marker.bindPopup(popup).openPopup();
      }
  }

  private getViewport(){
     if(this.addressService.address){
       let sw = new L.LatLng(this.addressService.address.viewport.southwest.lat - 5,
            this.addressService.address.viewport.southwest.lng - 5);
       let ne = new L.LatLng(this.addressService.address.viewport.northeast.lat + 5,
            this.addressService.address.viewport.northeast.lng + 5);
        return new L.LatLngBounds(sw, ne);              
     }else{
        return MaptapComponent.getEuViewport();
     }
  }

  private static getEuViewport() : L.LatLngBounds{
    let southWest = new L.LatLng(33, -17)
    let northEast = new L.LatLng(62, 32)
    return new L.LatLngBounds(southWest, northEast);
  }
}