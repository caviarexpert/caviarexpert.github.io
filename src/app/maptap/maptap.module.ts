import { NgModule, Inject } from "@angular/core";
import { BrowserModule, DOCUMENT } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MaptapComponent } from "./maptap.component";
import { AddressFormattedComponent } from "./address-formatted.component";
import { MapControlComponent } from "./map-control.component";

import { routing } from "./maptap.routing";

import { SharedModule } from "../shared/shared.module";
import { GeocodingService } from "../shared/geocoding.service";
import { TranslationService, TranslationModule, LocalizationModule, LocaleService } from "angular-l10n";


@NgModule({
    imports: [ HttpModule, routing, SharedModule, LocalizationModule.forChild() ],
    declarations: [MaptapComponent, AddressFormattedComponent, MapControlComponent],
    exports: [MaptapComponent]
})
export class MaptapModule { 
    constructor(@Inject(DOCUMENT) private document: any, private translation: TranslationService,
            private locale: LocaleService,
            private geocodingService : GeocodingService ){
        //let fileref = document.createElement("link");
        //fileref.setAttribute("rel", "stylesheet");
        //fileref.setAttribute("type", "text/css");
        //fileref.setAttribute("href", "https://unpkg.com/leaflet@1.0.3/dist/leaflet.css");
        //document.getElementsByTagName("head")[0].appendChild(fileref);
        this.locale.addConfiguration().defineDefaultLocale(
            this.geocodingService.getSharedLocale().getCurrentLanguage(),
            this.geocodingService.getSharedLocale().getCurrentCountry()
        );
        this.locale.init();


        this.geocodingService.getSharedLocale().defaultLocaleChanged.subscribe ( data => {
            //TODO better parse data (en-GB)
            let countryCode = this.geocodingService.getSharedLocale().getCurrentCountry();
            let langCode = this.geocodingService.getSharedLocale().getCurrentLanguage();
            this.locale.setDefaultLocale(langCode, countryCode);
        });

        console.log("Maptap languages", locale.getConfiguration().languageCodes)

        console.log("Default maptap locale", locale.getDefaultLocale())
        this.translation.addConfiguration() 
            .addProvider("./assets/l10n/maptap/locale-")
        this.translation.init();

        //this.geocodingService.
    }
}
