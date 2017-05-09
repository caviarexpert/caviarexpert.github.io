import { NgModule, ModuleWithProviders } from "@angular/core";
import { AddressService } from "./address.service";
import { GeocodingService } from "./geocoding.service";
import { SharedComponent } from "./shared.component";
//import { CommonModule }        from '@angular/common';
//import { FormsModule }         from '@angular/forms';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

 export const countries : string[] = ["UK", "DE", "FR", "IT", "ES", "PT", "NL", "BE", "LU", "NL", "DK",
    "PL", "CZ", "EE", "LT", "LV"];

@NgModule({
  imports: [ TranslateModule.forChild() ],
  declarations: [SharedComponent],
  exports: [ SharedComponent, TranslateModule ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [ AddressService, GeocodingService, TranslateService ]
      };
  }

  constructor( translateService : TranslateService){
        translateService.setTranslation("de", {
          COUNTRIES: {
            DE: "Deutchland",
            FR: "Francreich",
            IT: "Italien"
          }
        });
        translateService.setTranslation("en", {
          "HELLO" : "Hello",
          COUNTRIES: {
            DE: "Germany",
            FR: "France",
            IT: "Italy",
            ES: "Spain",
            PT: "Portugal",
            AD: "Andorra",
            BE: "Belgium",
            LU: "Luxembourg",
            NL: "Netherlands",
            IE: "Ireland",
            UK: "United Kingdom",
            DK: "Denmark",
            NO: "Norway",
            SE: "Sweden",
            FI: "Finland",
            EE: "Estonia",
            LV: "Latvia",
            LT: "Lithuania",
            PL: "Poland",
            CZ: "Czech",
            SK: "Slovakia",
            HU: "Hungary",
            RO: "Romania",
            BL: "Bulgaria",
            MK: "Macedonia",
            GR: "Greece",
            CY: "Cyprus",
            MT: "Malta",
            SL: "Slovenia",
            CR: "Croatia",
            AT: "Austria",
            LI: "Lichtenshtein",
            IS: "Iceland"
          }
        });
        translateService.setTranslation("es", { });
        translateService.setTranslation("fr", {});        
        translateService.setTranslation("it", {});
        translateService.setTranslation("ru", {});
        translateService.setDefaultLang("en");
        let brLang = translateService.getBrowserLang();
        translateService.use(brLang);
  }

 }