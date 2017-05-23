import { Injectable } from "@angular/core";
import { LatLng } from "leaflet";
import { GeocodeResult, AddressObject } from "./geocode";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AddressService {
  private value : AddressObject;// = new AddressObject( new GeocodeResult ([], "", null, "", []) );
  private latlng: LatLng;
  public addressToLocation: string;
  private addressAssigned: Subject<boolean> = new Subject<boolean>();
  public addressAssigned$ = this.addressAssigned.asObservable();

  get address(): AddressObject {
    return this.value;
  }
  assignAddress( geocodingResult : GeocodeResult ){
    this.addressAssigned.next(true);
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