import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from "./delivery.component";
import { AddressFormComponent } from "./address-form.component";

const routes: Routes = [
    { path: "delivery", component: DeliveryComponent, children: [
           { path: "map", loadChildren: "../maptap/maptap.module#MaptapModule" }
       ] },
    { path: "delivery-address", component: AddressFormComponent },
    { path: "map", loadChildren: "../maptap/maptap.module#MaptapModule" }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
