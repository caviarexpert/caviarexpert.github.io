import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { AddressObject } from "../shared/geocode";
import { AddressService } from "../shared/address.service";
import {Subscription} from "rxjs/Subscription";
import { TranslationService } from "angular-l10n";
import { DeliveryService, CountryEntity } from "../datasources/delivery.service";
import { PostmenService } from "../shared/postmen.service";

@Component({
    moduleId: module.id,
    selector: 'street-address',
    templateUrl: "./street-address.component.html"
})
export class StreetAddressComponent implements OnInit, OnDestroy {
    private _addressSubscription: Subscription;
    @ViewChild('streetAddressForm') finalAddressForm: ElementRef
    private _currentAddress : AddressObject;
    public deliveryQuotation : any;
    public hideControls = false;
    public hideEditForm = true;

    constructor(private addrService : AddressService, 
        private deliveryService : DeliveryService,
        private postmenService : PostmenService,
        public translationService: TranslationService ){}

    ngOnInit(){
        this._addressSubscription = this.addrService.addressAssigned$
            .subscribe( address => {
                this._currentAddress = address;
                this.hideControls = false;
                this.deliveryQuotation = null;
                this.hideEditForm = true;
             });
    }
    ngOnDestroy() {
        this._addressSubscription.unsubscribe();
    }
    get currentAddress() : AddressObject {
        return this._currentAddress;
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
    getShipmentQuote() : void {
        this.hideControls = true;
        this.postmenService.getQuotes(this.currentAddress)
            .subscribe ( 
                rate => {
                    this.deliveryQuotation = JSON.stringify(rate, null, 2);
                },
                error => {
                    console.error("AVE error:", error)
                },
                () => {}
            );
    }
}