import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaptapComponent } from './maptap.component';

const routes: Routes = [
  { path: '', component: MaptapComponent },
  { path: 'map', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
