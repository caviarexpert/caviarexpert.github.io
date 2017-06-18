import { Injectable } from "@angular/core";
import { TranslationService, Collator} from "angular-l10n";


export const countries : string[] = ["GB", "DE", "FR", "IT", "ES", "PT", "NL", "BE", "LU", "DK",
    "PL", "CZ", "EE", "LT", "LV", "AT"];

@Injectable()
export class DeliveryService{
    private _countries: CountryEntity[];
    constructor(private translation: TranslationService, private collator: Collator){
        this.translation.translationChanged.subscribe(
            () => this._makeCountriesList()
        );
        this._makeCountriesList();
    }
    get countries(){
        return this._countries;
    }

    private _makeCountriesList(){
        this._countries = countries.map( code => 
                    new CountryEntity(code, this.translation.translate("COUNTRY."+code))
                );
        this.collator.sort(
                    this._countries,
                    "name",
                    "asc",
                    "",
                    { sensitivity: 'variant' }
                );
    }
}

export class CountryEntity{
    constructor(private countryCode: string, private countryName: string ){}
    get name(){
        return this.countryName;
    }
    get code(){
        return this.countryCode;
    }
}