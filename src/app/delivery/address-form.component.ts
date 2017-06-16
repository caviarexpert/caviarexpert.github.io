import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import {NgForm} from "@angular/forms";
import { GeocodingService } from "../shared/geocoding.service";
import { AddressService } from "../shared/address.service";
import { GeocodeResponse, GeocodeResult, AddressObject } from "../shared/geocode";
import { UpuAddress, AddressTemplate, AddressLine } from "../shared/upu-address";
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/first';
import { TranslationService } from "angular-l10n";

@Component({
    moduleId: module.id,
    selector: 'address-form',
    templateUrl: "./address-form.component.html"
})
export class AddressFormComponent implements OnInit, OnDestroy {
  
  private addressLines : AddressLine[];
  private _addressSubscription : Subscription;

  @ViewChild('finalAddressForm') finalAddressForm: ElementRef
  
  constructor( private addressService : AddressService, private translationService: TranslationService ){}

  ngOnInit(){
    this._addressSubscription = this.addressService.addressAssigned$.subscribe ( address => {
      if(!!address){
        let upuAddress : UpuAddress = new UpuAddress();
        upuAddress.streetNumber = address.streetNumber;
        upuAddress.route = address.route;
        upuAddress.locality = address.locality;
        upuAddress.countryCode = address.countryCode;
        upuAddress.postalCode = address.postalCode;
        upuAddress.premise = address.premise;
        upuAddress.country = this.translationService.translate("COUNTRY."+address.countryCode, {}, "en");
        this.addressLines = AddressTemplate.formatAddress(upuAddress);
      }else{
        this.addressLines = undefined;
      }
    });
  }
  ngOnDestroy(){
    this._addressSubscription.unsubscribe();
  }

  get address() : AddressLine[] {
    return this.addressLines; 
  }

  public getFieldTranslation(fieldName : string) : string {
    return this.translationService.translate(fieldName);
  }
}