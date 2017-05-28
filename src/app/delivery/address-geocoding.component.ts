import { Component } from "@angular/core";
import {NgForm} from "@angular/forms";
import { GeocodingService } from "../shared/geocoding.service";
import { AddressService } from "../shared/address.service";
import { GeocodeResponse, GeocodeResult} from "../shared/geocode";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

@Component({
    moduleId: module.id,
    selector: 'address-geocoding',
    templateUrl: "./address-geocoding.component.html"
})
export class AddressGeocoding{
    constructor(private geocodingService: GeocodingService, private addressService: AddressService){}
    onSubmit(searchAddress: NgForm){
        let _address = searchAddress.value.addressToLocation;
        console.log("Address submited", _address);
        this.geocodingService.getLocation(_address).first()
            .subscribe ( result => {
                let geocodeResponse : GeocodeResponse = new GeocodeResponse(result);
                let geocodeResult : GeocodeResult = geocodeResponse.results[0];
                let addr = geocodeResult.formatted_address;
                this.addressService.assignAddress(geocodeResult);
                console.log("results: ", result);
            });
    }

    get addressToLocation(): string {
        return this.addressService.addressToLocation;
    }

    set addressToLocation(address: string) {
        this.addressService.addressToLocation = address;
    }
} 