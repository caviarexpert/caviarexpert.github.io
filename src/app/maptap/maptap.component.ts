import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit, ViewEncapsulation, ViewChild, ContentChild, ElementRef } from "@angular/core";
//import { System } from "systemjs";
//import L = require("leaflet");
import * as L from "leaflet";
import { GeocodingService } from "../shared/geocoding.service";
import { AddressService } from "../shared/address.service";
import { AddressFormattedComponent } from "./address-formatted.component";
import { MapControlComponent } from "./map-control.component";
import { GeocodeResult, GeocodeResponse } from "../shared/geocode";
import { TranslationService } from "angular-l10n";
import { Subscription } from "rxjs/Subscription";
import { environment } from "../../environments/environment";
import { AddressObject } from "../shared/geocode";


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
export class MaptapComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit{
  constructor(public geocodingService : GeocodingService, 
      public addressService : AddressService,
      private translationService: TranslationService){}

  @ViewChild(AddressFormattedComponent) addressFormatted : AddressFormattedComponent;
  @ViewChild(MapControlComponent) mapControl : MapControlComponent;
  
  leafletMap : any ;
  addressPopupHtml: L.Popup;
  //geocodingService : GeocodingService;
  private _lang: string;
  //private clearMarkerSubscription : Subscription;
  private addressSubscription : Subscription;

  private markersLayer = new L.LayerGroup([]);

  ngOnInit() {
    //this.clearMarkerSubscription  = this.addressService.clearMarkerSubject$.subscribe ( r => {
    //  this.markersLayer.clearLayers();
    //}); 
    //this.addressFormatted.changes.subscribe(changes => console.log(changes));
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.    
  }
  ngOnDestroy(){
    //this.clearMarkerSubscription.unsubscribe();
  }

  ngAfterContentInit() {
    
  }
  ngAfterViewInit() {
    //System.import("leaflet").then( m => {
          this.addressPopupHtml = L.popup({closeButton: false});
                    

          let geoService = this.geocodingService;
          let addrService = this.addressService;
          let tranlateService = this.translationService;
          let addressPopup = this.addressPopupHtml;
          let addressFormatted = this.addressFormatted;
         
          this.leafletMap = L.map("map", { zoomControl: false });
          const map = this.leafletMap;
          const markersLayer = this.markersLayer;          
          new L.Control.Zoom({ position: 'topright' }).addTo(map);
          map.addControl(this.getControl());
          this.markersLayer.addTo(map);
          //http://{s}.osm.maptiles.xyz/{z}/{x}/{y}.png
          //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
          //let osmTemplate = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
          let osmTemplate = environment.mapTilesUrlTemplate;
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
                  //addrService.coordinate = event.latlng;
                  addrService.assignAddress(geocodeResult, event.latlng);
                  //markersLayer.clearLayers();
                  //let marker = L.marker(addrService.coordinate);
                  //markersLayer.addLayer(marker);                 
                  //setTimeout(() => {
                  //  marker.bindPopup(addressPopup.setContent(addressFormatted.getHtml())).openPopup();
                  //}, 0);
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
          let currentAddress : AddressObject = null;
          map.on("load", () => {
              //this.addAddressMarker();
              this.addressSubscription = this.addressService.addressAssigned$.subscribe ( address => {
                this.markersLayer.clearLayers();
                if(address!=null && address.geocodeResult!=null && 
                    (address.geocodeResult.geometry.location_type=="ROOFTOP" || 
                          address.geocodeResult.geometry.location_type == "RANGE_INTERPOLATED")){
                      currentAddress = address;
                      let latlng = address.manualCoordinates || address.geocodeResult.geometry.location;
                      let marker = L.marker(latlng);
                      this.markersLayer.addLayer(marker);
                      this.addressFormatted.addressFromGoogleApi = address.formattedAddress;
                      setTimeout(() => {
                        marker.bindPopup(this.addressPopupHtml.setContent(this.addressFormatted.getHtml())).openPopup();
                      }, 0);
                  }
              });
          });
          map.fitBounds(MaptapComponent.getViewport(currentAddress));
    //});
  }
  private getControl(){
      let MyControl = L.Control.extend({
              options: {
                  position: 'topleft'
              },
              onAdd : (map) => {
                  // create the control container with a particular class name
                  var container = L.DomUtil.create('div', 'lc');
                  //container.innerHTML = this.mapControl.getHtml();
                  container.appendChild(this.mapControl.getHtml());
                  container.style.cursor = "crosshair";
                  ///L.DomUtil.disableTextSelection();
                  // ... initialize other DOM elements, add listeners, etc.

                  //return this.mapControl.getHtml();
                  return container;
              }
          });

          return new MyControl();    
  }
/*
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
        this.addressFormatted.restored = true;
        setTimeout(() => {
                    marker.bindPopup(this.addressPopupHtml.setContent(this.addressFormatted.getHtml())).openPopup();
        }, 0);
      }
  }
*/
  private static getViewport( address : AddressObject ){
     if(!!address){
       let sw = new L.LatLng(address.viewport.southwest.lat - 5,
            address.viewport.southwest.lng - 5);
       let ne = new L.LatLng(address.viewport.northeast.lat + 5,
            address.viewport.northeast.lng + 5);
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