import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { AddressObject } from "../shared/geocode";
import { AddressService } from "../shared/address.service";
import {Subscription} from "rxjs/Subscription";
import { TranslationService } from "angular-l10n";
import { DeliveryService, CountryEntity } from "../datasources/delivery.service";

@Component({
    moduleId: module.id,
    selector: 'street-address',
    templateUrl: "./street-address.component.html"
})
export class StreetAddressComponent implements OnInit, OnDestroy {
    private _addressSubscription: Subscription;
    @ViewChild('streetAddressForm') finalAddressForm: ElementRef
    private currentAddress : AddressObject;

    constructor(private addrService : AddressService, 
        private deliveryService : DeliveryService,
        public translationService: TranslationService ){}

    ngOnInit(){
        this._addressSubscription = this.addrService.addressAssigned$
            .subscribe( address => this.currentAddress = address );
    }
    ngOnDestroy() {
        this._addressSubscription.unsubscribe();
    }
    get geocodeAddress() : AddressObject {
        return this.currentAddress;
    }
    get countries() : CountryEntity[] {
        return this.deliveryService.countries;
    }
    findCountry(code : string) : CountryEntity {
        return this.deliveryService.countries
            .filter (ce => ce.code === code)
            .reduce ( (prev, current) => current);
            
    }
    clearAddress() : void {
        this.addrService.cancelAddress();
    }
}