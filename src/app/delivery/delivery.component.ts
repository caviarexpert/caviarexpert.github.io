import {Component, ViewChild, OnInit } from "@angular/core";
import { AddressService } from "../shared/address.service";
import { AddressObject } from "../shared/geocode";
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

    @ViewChild("addressForm") addressForm;
    @ViewChild("searchAddress") searchAddressForm;

    private formShown: boolean = false;
    private addressSet: boolean = false;
    private _subscription: Subscription;

    constructor(public addrService : AddressService, 
        private deliveryService: DeliveryService,
        public translationService: TranslationService) {}

    ngAfterViewInit() {        
        //this.form.control.valueChanges
        //    .subscribe(values => this.validateQuantity(values));
    }
    
    get geocodeAddress() : AddressObject {
        return this.addrService.address?this.addrService.address:new AddressObject( new GeocodeResult ([], "", null, "", []) );
    }
    /**
     * @return a list countries ordered ASC in current locale
     */
    get countries() : CountryEntity[] {
        return this.deliveryService.countries;
    }

    get showForm(): boolean {
        if(this.addressSet===true && this.formShown===true) return true;
        return this.formShown;
    }

    cancelForm() {
        this.formShown = false;
    }

    ngOnInit(){
        this._subscription = this.addrService.addressAssigned$.subscribe( value => { 
            this.addressSet = value;
            this.formShown = value;
        });
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /*
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
    */    
}
