import { Injectable } from '@angular/core';
import { LatLng } from 'leaflet';
import { GeocodeResult, AddressObject } from './geocode';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { SessionService, SessionDataProvider, SessionData } from './session.service';

@Injectable()
export class AddressService {
  // private value : AddressObject;// = new AddressObject( new GeocodeResult ([], '', null, '', []) );
  public addressToLocation: string;
  private addressAssigned: BehaviorSubject<AddressObject> = new BehaviorSubject<AddressObject>(null);
  // private mapclickAssigned: Subject<boolean> = new Subject<boolean>();
  public addressAssigned$ = this.addressAssigned.asObservable();
  // public mapclickAssigned$ = this.mapclickAssigned.asObservable();

  // public clearMarkerSubject: Subject<boolean> = new Subject<boolean>();
  // public clearMarkerSubject$ = this.clearMarkerSubject.asObservable();

  constructor(private sessionService: SessionService) {
    sessionService.registerProvider( () => new SessionData( 'address',  this.addressAssigned.getValue()) );
  }

  cancelAddress(): void {
    this.addressAssigned.next(null);
  }
  assignAddress( geocodingResult: GeocodeResult, coordinates?: LatLng) {
    this.addressAssigned.next(new AddressObject(geocodingResult, coordinates));
  }

  getCurrentAddress(): AddressObject {
    return this.addressAssigned.getValue();
  }
}
