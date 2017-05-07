import {Component, ViewChild} from "@angular/core";
import { AddressService } from "../shared.module";


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
}
