import { NgModule, Inject } from "@angular/core";
import { BrowserModule, DOCUMENT } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MaptapComponent } from "./maptap.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { routing } from "./maptap.routing";

import { SharedModule } from "../shared/shared.module";


@NgModule({
    imports: [ HttpModule, routing, SharedModule ],
    declarations: [MaptapComponent],
    exports: [MaptapComponent],
    providers: [ TranslateService ]
})
export class MaptapModule { 
    constructor(@Inject(DOCUMENT) private document: any){
        //let fileref = document.createElement("link");
        //fileref.setAttribute("rel", "stylesheet");
        //fileref.setAttribute("type", "text/css");
        //fileref.setAttribute("href", "https://unpkg.com/leaflet@1.0.3/dist/leaflet.css");
        //document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}
