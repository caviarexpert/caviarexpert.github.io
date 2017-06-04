import { Component, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import {NgForm} from "@angular/forms";
import { GeocodingService } from "../shared/geocoding.service";
import { AddressService } from "../shared/address.service";
import { GeocodeResponse, GeocodeResult} from "../shared/geocode";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

@Component({
    moduleId: module.id,
    selector: 'address-formatted',
    templateUrl: "./address-formatted.component.html"
})
export class AddressFormattedComponent implements AfterViewInit{

    @ViewChild('addressHtml') addressHtml: ElementRef

    constructor(private addressService : AddressService){}

    ngAfterViewInit(){
        console.log("addressHtml", this.addressHtml.nativeElement);
    }

    public getHtml(): any {
        return this.addressHtml.nativeElement;
    }

    get addressFromGoogleApi(): string {
        if(!!this.addressService.address){
            return this.addressService.address.formattedAddress;
        }else return "";        
    }
}