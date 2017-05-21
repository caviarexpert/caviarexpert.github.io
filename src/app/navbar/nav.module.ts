import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NavComponent } from "./nav.component";
import { ThemeComponent } from "./theme/theme.component";
import { LangComponent } from "./lang.component";
import { CartSummaryComponent } from "./cart-summary.component";

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RouterModule } from "@angular/router";
import { StoreModule } from "../store/store.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from "../shared/shared.module";
import { LocalizationModule } from "angular-l10n";


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        //StoreModule,
        SharedModule,
        LocalizationModule,
        BsDropdownModule.forRoot(),
        ButtonsModule.forRoot()
    ],
    declarations: [NavComponent, ThemeComponent, LangComponent, CartSummaryComponent ],
    exports: [ NavComponent, ThemeComponent, LangComponent, CartSummaryComponent ]
})
export class NavModule {}