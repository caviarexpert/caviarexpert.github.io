import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalizationModule, TranslationService } from 'angular-l10n';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent } from './delivery.component';
import { DeliveryComponentService } from './delivery-component.service';
import { UpuAddressComponent } from './upu-address.component';
import { RatesComponent } from './rates.component';
import { StreetAddressComponent } from './street-address.component';
import { AddressGeocoding } from './address-geocoding.component';
import { SharedModule } from '../shared/shared.module';
// import { AppModule } from "../app.module";
// import { TranslateModule, TranslateService } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule, FormsModule,
    DeliveryRoutingModule,
    SharedModule,
    LocalizationModule
  ],
  declarations: [ DeliveryComponent, AddressGeocoding, UpuAddressComponent, StreetAddressComponent, RatesComponent ],
  exports: [ DeliveryComponent ],
  providers: [ DeliveryComponentService ]
})
export class DeliveryModule {
  constructor(private translation: TranslationService) {
        this.translation.addConfiguration()
            .addProvider('./assets/l10n/delivery/delivery-');
        this.translation.init();
    }
}
