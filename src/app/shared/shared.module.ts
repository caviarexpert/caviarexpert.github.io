import { NgModule, ModuleWithProviders } from "@angular/core";
import { AddressService } from "./address.service";
import { GeocodingService } from "./geocoding.service";
//import { CommonModule }        from '@angular/common';
//import { FormsModule }         from '@angular/forms';
//import {TranslateModule, TranslateService} from '@ngx-translate/core';


@NgModule({})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [ AddressService, GeocodingService ]
      };
  }

 }