import { Component, ViewChild, AfterViewInit, AfterViewChecked, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { GeocodingService } from '../shared/geocoding.service';
import { AddressService } from '../shared/address.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

@Component({
    moduleId: module.id,
    selector: 'address-formatted',
    templateUrl: './address-formatted.component.html',
        styleUrls: ['./address-formatted.css']
})
export class AddressFormattedComponent implements AfterViewInit {

    @ViewChild('addressHtml') addressHtml: ElementRef;
    private isAddressRestored = false;
    private _addressFromGoogleApi: string;

    constructor(private addressService: AddressService) {}
    ngAfterViewInit() {}
    public getHtml(): any {
        return this.addressHtml.nativeElement;
    }

    set addressFromGoogleApi( formattedAddress: string ) {
        this._addressFromGoogleApi = formattedAddress;
    }

    get addressFromGoogleApi(): string {
        return this._addressFromGoogleApi || '';
    }

    public clearAddress(): void {
        this.addressService.cancelAddress();
    }

    set restored( isRestored: boolean ) {
        this.isAddressRestored = isRestored;
    }
    get restored(): boolean {
        return this.isAddressRestored;
    }
}
