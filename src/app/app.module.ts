import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { ThemeComponent } from './theme/theme.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


@NgModule({
  declarations: [
    AppComponent, StoreComponent, ThemeComponent
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: "store", component: ThemeComponent },
      { path: "**", redirectTo: "/store" }
    ]),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ThemeComponent]
})
export class AppModule { }
