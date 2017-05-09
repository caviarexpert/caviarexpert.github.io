import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DeliveryRoutingModule } from "./delivery-routing.module";
import { DeliveryComponent } from "./delivery.component";

import { SharedModule } from "../shared/shared.module";
//import { AppModule } from "../app.module";
import { TranslateModule, TranslateService } from "@ngx-translate/core";


@NgModule({
  imports: [
    CommonModule, FormsModule,
    DeliveryRoutingModule,
    SharedModule,
    //AppModule,
    TranslateModule.forChild()
  ],
  declarations: [DeliveryComponent],
  exports: [DeliveryComponent],
  providers: [
       //TranslateService
    ]
})
export class DeliveryModule { }
