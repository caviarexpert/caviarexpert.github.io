import { NgModule, ModuleWithProviders } from "@angular/core";
import { HttpModule } from '@angular/http';
import { AddressService } from "./address.service";
import { GeocodingService } from "./geocoding.service";
import { DeliveryService } from "../datasources/delivery.service";
import { SharedComponent } from "./shared.component";
//import { CommonModule }        from '@angular/common';
//import { FormsModule }         from '@angular/forms';
import { 
  LocalizationModule, 
  LocaleService, 
  TranslationService,
  Collator
  //TranslatePipe, 
  //LocaleDatePipe,
  //LocaleConfig,
  //TranslationConfig,
  //InjectorRef
} from 'angular-l10n';

@NgModule({
  imports: [ 
    HttpModule,
    LocalizationModule.forRoot()
  ],
  declarations: [SharedComponent]
  //exports: [ LocalizationModule ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [ 
                AddressService,
                GeocodingService,
                DeliveryService,
                Collator
                //InjectorRef,
                //LocaleConfig,
                //LocaleService,
                //TranslationConfig,
                //TranslationService
        ]
      };
    }

    constructor(public locale: LocaleService, public translation: TranslationService){
        this.locale.addConfiguration()
          .disableStorage()
          .addLanguages(["en", "it", "ru"])
          .defineDefaultLocale("en", "GB")
          .defineCurrency("EUR");
          //.defineLanguage('en');            
        this.locale.init();

        this.translation.addConfiguration()
            .addProvider('./assets/l10n/shared/locale-');
        this.translation.init();
    }

 }