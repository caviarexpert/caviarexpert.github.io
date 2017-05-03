import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartDetailComponent } from "./cartdetails.component";
import { StoreComponent } from "./store.component";

const routes: Routes = [
    { path: "cart", component: CartDetailComponent },
    { path: "store", component: StoreComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
