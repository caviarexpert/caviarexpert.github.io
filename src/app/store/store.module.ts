import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { StoreComponent } from "./store.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule],
    declarations: [StoreComponent],
    exports: [StoreComponent],
    providers: [
       { provide: LOCALE_ID, useValue: "ru-RU" }
    ]
})
export class StoreModule { }