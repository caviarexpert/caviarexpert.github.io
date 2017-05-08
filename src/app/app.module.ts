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
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NavModule, StoreModule, DeliveryModule, NavModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot([
       { path: '',   redirectTo: '/store', pathMatch: 'full' },
       { path: "**", redirectTo: "/store" }
    ])
    //  { path: "store", component: ThemeComponent },
    //  { path: "**", redirectTo: "/store" }
    //BsDropdownModule.forRoot(),
    //ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
    constructor(@Inject(DOCUMENT) private document: any){
        let bootswatch = document.createElement("link");
        bootswatch.rel = "stylesheet";
        bootswatch.type = "text/css";
        bootswatch.href = "https://bootswatch.com/4-alpha/cosmo/bootstrap.min.css";
        document.getElementsByTagName("head")[0].appendChild(bootswatch);

        let fa = document.createElement("link");
        fa.rel = "stylesheet";
        fa.type = "text/css";
        fa.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
        document.getElementsByTagName("head")[0].appendChild(fa);
    }
 }
