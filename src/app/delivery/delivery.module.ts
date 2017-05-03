import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRoutingModule } from "./delivery-routing.module";
import { DeliveryComponent } from "./delivery.component";


@NgModule({
  imports: [
    CommonModule,
    DeliveryRoutingModule
  ],
  declarations: [DeliveryComponent],
  exports: [DeliveryComponent],
})
export class DeliveryModule { }
