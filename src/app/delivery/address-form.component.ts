import { Component } from "@angular/core";
import {NgForm} from "@angular/forms";
import { GeocodingService } from "../shared/geocoding.service";
import { AddressService } from "../shared/address.service";
import { GeocodeResponse, GeocodeResult } from "../shared/geocode";
import { UpuAddress, AddressTemplate, AddressLine } from "../shared/upu-address";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { TranslationService } from "angular-l10n";

@Component({
    moduleId: module.id,
    selector: 'address-form',
    templateUrl: "./address-form.component.html"
})
export class AddressFormComponent {
  
  private addressLines : AddressLine[];
  
  constructor( private addressService : AddressService, private translationService: TranslationService ){
    let address : UpuAddress = new UpuAddress();
    let a = this.addressService.address;
    address.streetNumber = a.streetNumber;
    address.route = a.route;
    address.locality = a.locality;
    address.countryCode = a.countryCode;
    address.postalCode = a.postalCode;
    address.premise = a.premise;
    address.country = this.translationService.translate("COUNTRY."+address.countryCode, {}, "en");
    this.addressLines = AddressTemplate.formatAddress(address);
  }

  get address() : AddressLine[] {
    return this.addressLines;
  }

  public getFieldTranslation(fieldName : string) : string {
    return this.translationService.translate(fieldName);
  }
}