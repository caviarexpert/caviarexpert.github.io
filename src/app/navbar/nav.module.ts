import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NavComponent } from "./nav.component";
import { ThemeComponent } from "./theme/theme.component";
import { LangComponent } from "./lang.component";
import { CartSummaryComponent } from "./cart-summary.component";

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        BrowserModule,
        BsDropdownModule.forRoot(),
        ButtonsModule.forRoot(),
        TranslateModule.forChild()
    ],
    declarations: [NavComponent, ThemeComponent, LangComponent, CartSummaryComponent ],
    exports: [ NavComponent, ThemeComponent, LangComponent, CartSummaryComponent ]
})
export class NavModule {}