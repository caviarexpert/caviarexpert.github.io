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

  @ViewChild('finalAddressForm') finalAddressForm: ElementRef
  
  constructor( private addressService : AddressService, private translationService: TranslationService ){}

  ngOnInit(){}
  ngOnDestroy(){}

  get address() : AddressLine[] {
    let upuAddress = this.addressService.postalAddress;
    if(!!upuAddress){
      return AddressTemplate.formatAddress(upuAddress);
    }else{
      return null;
    }    
  }

  public getFieldTranslation(fieldName : string) : string {
    return this.translationService.translate(fieldName);
  }
}