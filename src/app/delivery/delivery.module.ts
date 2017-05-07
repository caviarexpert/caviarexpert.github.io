import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DeliveryRoutingModule } from "./delivery-routing.module";
import { DeliveryComponent } from "./delivery.component";

import { SharedModule } from "../shared.module";


@NgModule({
  imports: [
    CommonModule, FormsModule,
    DeliveryRoutingModule,
    SharedModule
  ],
  declarations: [DeliveryComponent],
  exports: [DeliveryComponent],
})
export class DeliveryModule { }
