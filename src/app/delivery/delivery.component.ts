import {Component, ViewChild, OnInit } from "@angular/core";
import { AddressService } from "../shared/address.service";
import { AddressObject } from "../shared/geocode";
import { UpuAddress } from "../shared/upu-address";
import { DeliveryService, CountryEntity } from "../datasources/delivery.service";
import { Language, DefaultLocale, Currency, TranslationService } from "angular-l10n";
import {Subscription} from "rxjs/Subscription";
import { GeocodeResult } from "../shared/geocode";


@Component({
    moduleId: module.id,
    selector: 'delivery-details',
    templateUrl: "./delivery.component.html",
    styleUrls: ["./delivery.component.css"]
})
export class DeliveryComponent implements OnInit {
    @Language() lang: string;
    @DefaultLocale() defaultLocale: string;
    @Currency() currency: string;

    @ViewChild("searchAddress") searchAddressForm;
    
    private _addressSubscription: Subscription;
    private currentAddress : AddressObject = null;

    constructor(public addrService : AddressService, 
        private deliveryService: DeliveryService,
        public translationService: TranslationService) {

        
    }
    
    get geocodeAddress() : AddressObject {
        return this.currentAddress || new AddressObject();
    }
    /**
     * @return a list countries ordered ASC in current locale
     */
    get countries() : CountryEntity[] {
        return this.deliveryService.countries;
    }

    get isShowAddressForm(): boolean {
        return !!this.currentAddress;
    }

    cancelForm() : void {
        this.addrService.cancelAddress();
    }

    ngOnInit(){
        this._addressSubscription = this.addrService.addressAssigned$
            .subscribe( address => this.currentAddress = address );
    }
    ngOnDestroy() {
        this._addressSubscription.unsubscribe();
    }
}
