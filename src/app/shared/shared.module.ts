import { NgModule, ModuleWithProviders } from "@angular/core";
import { HttpModule } from '@angular/http';
import { AddressService } from "./address.service";
import { GeocodingService } from "./geocoding.service";
import { SharedComponent } from "./shared.component";
//import { CommonModule }        from '@angular/common';
//import { FormsModule }         from '@angular/forms';
import { 
  LocalizationModule, 
  LocaleService, 
  TranslationService, 
  TranslatePipe, 
  LocaleDatePipe,
} from 'angular-l10n';

 export const countries : string[] = ["UK", "DE", "FR", "IT", "ES", "PT", "NL", "BE", "LU", "NL", "DK",
    "PL", "CZ", "EE", "LT", "LV"];

@NgModule({
  imports: [ 
    HttpModule,
    LocalizationModule.forRoot()
  ],
  declarations: [SharedComponent],
  exports: [ SharedComponent, TranslatePipe, LocaleDatePipe ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [ AddressService, GeocodingService, LocaleService, TranslationService ]
      };
    }

    constructor(public locale: LocaleService, public translation: TranslationService){
        this.locale.addConfiguration()
          .disableStorage()
          .addLanguages(['it', 'en_UK'])
          .defineDefaultLocale('it', 'IT');
          //.defineLanguage('en');            
        this.locale.init();

        this.translation.addConfiguration()
            .addProvider('./assets/l10n/locale-');
        this.translation.init();
    }

 }