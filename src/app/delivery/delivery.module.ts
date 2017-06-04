import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DeliveryRoutingModule } from "./delivery-routing.module";
import { DeliveryComponent } from "./delivery.component";
import { AddressGeocoding } from "./address-geocoding.component";
import { AddressFormattedComponent } from "./address-formatted.component"

import { SharedModule } from "../shared/shared.module";
//import { AppModule } from "../app.module";
//import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LocalizationModule, TranslationService } from "angular-l10n";


@NgModule({
  imports: [
    CommonModule, FormsModule,
    DeliveryRoutingModule,
    SharedModule,
    LocalizationModule
  ],
  declarations: [ DeliveryComponent, AddressGeocoding, AddressFormattedComponent ],
  exports: [ DeliveryComponent, AddressFormattedComponent ]
})
export class DeliveryModule {
  constructor(private translation: TranslationService){
        this.translation.addConfiguration() 
            .addProvider("./assets/l10n/delivery/delivery-");
        this.translation.init();    
    }
}
