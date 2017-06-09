import { Component, ViewChild, AfterViewInit, AfterViewChecked, ElementRef } from "@angular/core";
import {NgForm} from "@angular/forms";
import { GeocodingService } from "../shared/geocoding.service";
import { AddressService } from "../shared/address.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

@Component({
    moduleId: module.id,
    selector: 'address-formatted',
    templateUrl: "./address-formatted.component.html",
        styleUrls: ["./address-formatted.css"]
})
export class AddressFormattedComponent implements AfterViewInit{

    @ViewChild('addressHtml') addressHtml: ElementRef
    private isAddressRestored : boolean = false;

    constructor(private addressService : AddressService){}

    ngAfterViewInit(){}

    public getHtml(): any {
        return this.addressHtml.nativeElement;
    }

    get addressFromGoogleApi(): string {
        if(!!this.addressService.address){
            return this.addressService.address.formattedAddress;
        }else return "";        
    }

    public clearMarker() : void {
        this.addressService.clearMarkerSubject.next(true);
    }

    set restored( isRestored : boolean ) {
        this.isAddressRestored = isRestored;
    }
    get restored() : boolean {
        return this.isAddressRestored;
    }
}