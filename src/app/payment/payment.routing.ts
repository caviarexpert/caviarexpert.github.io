import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StripeComponent } from "./stripe.component";
import { ChoosePaymentComponent } from "./choose-payment.component";

const routes: Routes = [
  { path: "", component: ChoosePaymentComponent },
  { path: "*", redirectTo: "" }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);