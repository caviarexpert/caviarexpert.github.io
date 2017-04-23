import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';

//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { NavModule } from "./navbar/nav.module";
import { StoreModule } from "./store/store.module";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NavModule, StoreModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot()
    //RouterModule.forRoot([
    //  { path: "store", component: ThemeComponent },
    //  { path: "**", redirectTo: "/store" }
    //]),
    //BsDropdownModule.forRoot(),
    //ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
