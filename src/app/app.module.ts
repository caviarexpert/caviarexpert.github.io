import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { NgModule, Inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { StoreComponent } from "./store/store.component";
import { CartDetailComponent } from "./store/cartdetails.component";

//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { NavModule } from "./navbar/nav.module";
import { StoreModule } from "./store/store.module";
import { DeliveryModule } from "./delivery/delivery.module";
import { SharedModule } from "./shared/shared.module";
//import { LocalizationModule, LocaleService, TranslationService } from 'angular-l10n';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NavModule,
    StoreModule,
    //DeliveryModule,
    BrowserModule,
    FormsModule,
    SharedModule.forRoot(),

    //HttpModule,
    //LocalizationModule.forChild()
    RouterModule.forRoot([
       { path: '',   redirectTo: '/store', pathMatch: 'full' },
       { path: "**", redirectTo: "/store" }
    ])
    //  { path: "store", component: ThemeComponent },
    //  { path: "**", redirectTo: "/store" }
    //BsDropdownModule.forRoot(),
    //ButtonsModule.forRoot()
  ],
  //providers: [ TranslateService ],
  bootstrap: [AppComponent],
  //exports: [ SharedModule ]
})
export class AppModule {
    constructor(@Inject(DOCUMENT) private document: any){
        let bootswatch = document.createElement("link");
        bootswatch.rel = "stylesheet";
        bootswatch.type = "text/css";
        bootswatch.href = "https://unpkg.com/bootstrap@4.0.0-alpha.6/dist/css/bootstrap.min.css";
        //bootswatch.href = "https://bootswatch.com/4-alpha/cosmo/bootstrap.min.css";
        document.getElementsByTagName("head")[0].appendChild(bootswatch);

        let fa = document.createElement("link");
        fa.rel = "stylesheet";
        fa.type = "text/css";
        fa.href = "https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css";
        //fa.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
        //fa.href = "https://unpkg.com/bootstrap@4.0.0-alpha.6/dist/css/bootstrap.min.css";
        document.getElementsByTagName("head")[0].appendChild(fa);
/*
        this.translation.addConfiguration()
            //.addProvider('./assets/l10n/locale-countries-'); 
            .addProvider("./assets/l10n/app-");

        this.translation.init();
*/     
    }
 }
