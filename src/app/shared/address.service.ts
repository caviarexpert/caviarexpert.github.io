import { Injectable } from "@angular/core";
import { LatLng } from "leaflet";

@Injectable()
export class AddressService {
  constructor(){
    console.log("AddressService created")
  }
  private value : string;
  private latlng: LatLng; 

  get address(): string {
    return this.value;
  }
  set address(newAddress : string){
    this.value = newAddress;
  }
  
  get coordinate(): LatLng {
      return this.latlng;
  }
  set coordinate(latLng : LatLng){
      this.latlng = latLng;
  }
}