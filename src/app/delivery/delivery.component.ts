import {Component, ViewChild, OnInit } from "@angular/core";
import { AddressService } from "../shared/address.service";
import { AddressObject } from "../shared/geocode";
import { countries } from "../shared/shared.module";
import { TranslateService } from "@ngx-translate/core";


@Component({
    moduleId: module.id,
    selector: 'delivery-details',
    templateUrl: "./delivery.component.html",
    styleUrls: ["./delivery.component.css"]
})
export class DeliveryComponent implements OnInit {
    @ViewChild("addressForm") form;
    constructor(public addrService : AddressService, private translateService: TranslateService) {}

    ngAfterViewInit() {
        //this.form.control.valueChanges
        //    .subscribe(values => this.validateQuantity(values));
    }
    
    get geocodeAddress() : AddressObject {
        return this.addrService.address;
    }

    get countries() : string[] {
        return countries;
    }

    ngOnInit(){
        this.translateService.setTranslation("en", {
            ADDRESS: {
                postal_code: "postal code",
                locality: "locality",
                administrative_area_level_1: "region",
                administrative_area_level_2: "district"
            }
        });
        this.translateService.setTranslation("es", {
            ADDRESS: {
                postal_code: "código postal",
                locality: "localidad",
                administrative_area_level_1: "Región",
                administrative_area_level_2: "área"
            }
        });
        this.translateService.setTranslation("de", {
            ADDRESS: {
                postal_code: "Postleitzahl",
                locality: "Lokalität",
                administrative_area_level_1: "Region",
                 administrative_area_level_2: "Bezirk"
            }
        });
        this.translateService.setTranslation("ru", {
            ADDRESS: {
                postal_code: "почтовый индекс",
                locality: "местонахождение",
                administrative_area_level_1: "регион",
                administrative_area_level_2: "район"
            }
        });
        this.translateService.setTranslation("it", {
            ADDRESS: {
                postal_code: "codice postale",
                locality: "località",
                administrative_area_level_1: "regione",
                administrative_area_level_2: "provincia"
            }
        });
        
    }
}
