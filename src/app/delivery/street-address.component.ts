import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import { TranslationService } from 'angular-l10n';

import { AddressObject } from '../shared/geocode';
import { AddressService } from '../shared/address.service';
import { DeliveryComponentService } from './delivery-component.service';
import { DeliveryService, CountryEntity } from '../datasources/delivery.service';
import { PostmenService } from '../shared/postmen.service';
import { GeocodingService } from '../shared/geocoding.service';
import { GeocodeResponse, GeocodeResult } from '../shared/geocode';
import { UpuAddress } from '../shared/upu-address';

@Component({
    moduleId: module.id,
    selector: 'app-street-address',
    templateUrl: './street-address.component.html'
})
export class StreetAddressComponent implements OnInit, OnDestroy {
    private _addressSubscription: Subscription;
    @ViewChild('streetAddressForm') finalAddressForm: ElementRef;
    private _currentAddress: AddressObject;
    private _hideEditForm = true;

    constructor(private addrService: AddressService,
        private geocodingService: GeocodingService,
        // private postmenService: PostmenService,
        private deliveryComponentService: DeliveryComponentService,
        private deliveryService: DeliveryService,
        public translationService: TranslationService ) {}

    ngOnInit(){
        this._addressSubscription = this.addrService.addressAssigned$
            .subscribe( address => {
                this._currentAddress = address;
                this._hideEditForm = true;
             });
    }
    ngOnDestroy() {
        this._addressSubscription.unsubscribe();
    }
    get hideEditForm (): boolean {
        return this._hideEditForm;
    }
    set hideEditForm( val: boolean) {
        this.deliveryComponentService.quotationDisabled = !val;
        this._hideEditForm = val;
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
    clearAddress(): void {
        this.addrService.cancelAddress();
        // this.postmenService.clearQuotes();
    }
    updateAddress(editAddressForm: NgForm): void {
        const _route = editAddressForm.value.route;
        const _streetNum = editAddressForm.value.buildingNumber;
        if ( this._currentAddress.route === _route &&
            this._currentAddress.buildingNumber === _streetNum ) {
                this.hideEditForm = true;
                return;
            };
        const _upuAddr = UpuAddress.fromAddress(this._currentAddress);
        _upuAddr.route = _route;
        _upuAddr.streetNumber = _streetNum;
        _upuAddr.postalCode = null;
        const _addrString = _upuAddr.toString();
        console.log('Address to geocode: ', _addrString);
        this.geocodingService.getLocation(_addrString).first()
            .subscribe ( result => {
                const geocodeResponse: GeocodeResponse = new GeocodeResponse(result);
                const geocodeResult: GeocodeResult = geocodeResponse.results[0];
                const newAddr: AddressObject = new AddressObject(geocodeResult);
                const isSamePostalArea = AddressObject.isSamePostalArea( this._currentAddress, newAddr );
                if (!isSamePostalArea) {
                    // this.postmenService.clearQuotes();
                } else {
                    // FIXME alert in GUI... GeoRepsone may have partial postcode: W1D for example - just prefix
                    // console.warn("Old or new address doesn't have postal code")
                }
                console.log('results: ', result);
                this.addrService.assignAddress(geocodeResult);
            });
    }
}