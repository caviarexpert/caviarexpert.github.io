import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { StoreComponent } from "./store.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared.module";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule, TranslateModule.forChild()],
    declarations: [StoreComponent],
    exports: [StoreComponent],
    providers: [
       TranslateService,
       { provide: LOCALE_ID, useValue: "ru-RU" }
    ]
})
export class StoreModule { }