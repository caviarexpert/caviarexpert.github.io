import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StripeComponent } from './stripe.component';
import { ChoosePaymentComponent } from './choose-payment.component';
import { Secure3DStatusComponent } from './secure-3d-status.component';
import { ThanksComponent } from './thanks.component';
import { InvoiceComponent } from './invoice.component';

const routes: Routes = [
  { path: '', component: ChoosePaymentComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'secure-3d-status', component: Secure3DStatusComponent },
  { path: 'thanks', component: ThanksComponent },
  { path: '*', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
