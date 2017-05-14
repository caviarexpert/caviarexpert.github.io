import { Component } from "@angular/core";
import {NgForm} from "@angular/forms";
import { GeocodingService } from "../shared/geocoding.service";
import { AddressService } from "../shared/address.service";
import { GeocodeResponse, GeocodeResult} from "../shared/geocode";

@Component({
    moduleId: module.id,
    selector: 'address-geocoding',
    templateUrl: "./address-geocoding.component.html"
})
export class AddressGeocoding{
    constructor(private geocodingService: GeocodingService, private addressService: AddressService){}
    address: string;
    onSubmit(searchAddress: NgForm){
        let _address = searchAddress.value.addressToLocation;
        console.log("Address submited", _address);
        this.geocodingService.getLocation(_address)
            .subscribe ( result => {
                let geocodeResponse : GeocodeResponse = new GeocodeResponse(result);
                let geocodeResult : GeocodeResult = geocodeResponse.results[0];
                let addr = geocodeResult.formatted_address;
                this.addressService.assignAddress(geocodeResult);
                console.log("results: ", result);
            });
    }
} 