import { Injectable } from "@angular/core";
import { LatLng } from "leaflet";
import { GeocodeResult, AddressObject } from "./geocode";

@Injectable()
export class AddressService {
  private value : AddressObject = new AddressObject( new GeocodeResult ([], "", null, "", []) );
  private latlng: LatLng;

  get address(): AddressObject {
    return this.value;
  }
  assignAddress( geocodingResult : GeocodeResult ){
    this.value = new AddressObject(geocodingResult);
  }
  
  get coordinate(): LatLng {
      return this.latlng;
  }
  set coordinate(latLng : LatLng){
      this.latlng = latLng;
  }
  
  addressAsJson() : string {
      return JSON.stringify(this.value);
  }
}