import {Component, ViewChild} from "@angular/core";
import { AddressService } from "../shared/address.service";
import { AddressObject } from "../shared/geocode";


@Component({
    moduleId: module.id,
    selector: 'delivery-details',
    templateUrl: "./delivery.component.html",
    styleUrls: ["./delivery.component.css"]
})
export class DeliveryComponent {
    @ViewChild("addressForm") form;
    constructor(public addrService : AddressService) {}

    ngAfterViewInit() {
        //this.form.control.valueChanges
        //    .subscribe(values => this.validateQuantity(values));
    }
    
    get geocodeAddress() : AddressObject {
        return this.addrService.address;
    }
}
