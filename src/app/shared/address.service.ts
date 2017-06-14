import { Injectable } from "@angular/core";
import { LatLng } from "leaflet";
import { GeocodeResult, AddressObject } from "./geocode";
import { UpuAddress } from "./upu-address";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AddressService {
  //private value : AddressObject;// = new AddressObject( new GeocodeResult ([], "", null, "", []) );
  public addressToLocation: string;
  private addressAssigned: BehaviorSubject<AddressObject> = new BehaviorSubject<AddressObject>(null);
  //private mapclickAssigned: Subject<boolean> = new Subject<boolean>();
  public addressAssigned$ = this.addressAssigned.asObservable();
  //public mapclickAssigned$ = this.mapclickAssigned.asObservable();

  //public clearMarkerSubject: Subject<boolean> = new Subject<boolean>();
  //public clearMarkerSubject$ = this.clearMarkerSubject.asObservable();

  private _postalAddress : UpuAddress;

  cancelAddress(): void {
    this.addressAssigned.next(null);
  }
  assignAddress( geocodingResult : GeocodeResult, coordinates? : LatLng){
    this.addressAssigned.next(new AddressObject(geocodingResult, coordinates));
  }

  set postalAddress( postalAddress : UpuAddress ){
    this._postalAddress = postalAddress;
  }
  get postalAddress() : UpuAddress {
    return this._postalAddress;
  }

}