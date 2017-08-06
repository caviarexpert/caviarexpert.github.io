import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { NgModule, Inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { CartDetailComponent } from './store/cartdetails.component';
import { NavModule } from './navbar/nav.module';
import { StoreModule } from './store/store.module';
import { DeliveryModule } from './delivery/delivery.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NavModule,
    StoreModule,
    DeliveryModule,
    BrowserModule,
    FormsModule,
    SharedModule.forRoot(),

    RouterModule.forRoot([
       { path: '',   redirectTo: '/store', pathMatch: 'full' },
       { path: '**', redirectTo: '/store' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(@Inject(DOCUMENT) private document: any) {
        const bootswatch = document.createElement('link');
        bootswatch.rel = 'stylesheet';
        bootswatch.type = 'text/css';
        bootswatch.href = 'https://unpkg.com/bootstrap@4.0.0-alpha.6/dist/css/bootstrap.min.css';
        // bootswatch.href = 'https://bootswatch.com/4-alpha/cosmo/bootstrap.min.css';
        document.getElementsByTagName('head')[0].appendChild(bootswatch);

        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.type = 'text/css';
        fa.href = 'https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css';
        // fa.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
        // fa.href = 'https://unpkg.com/bootstrap@4.0.0-alpha.6/dist/css/bootstrap.min.css';
        document.getElementsByTagName('head')[0].appendChild(fa);
    }
 }
