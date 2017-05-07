import { NgModule, Inject } from "@angular/core";
import { BrowserModule, DOCUMENT } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MaptapComponent } from "./maptap.component";
import { GeocodingService } from "./geocoding.service";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { routing } from "./maptap.routing";


@NgModule({
    imports: [ HttpModule, routing ],
    declarations: [MaptapComponent],
    exports: [MaptapComponent],
    providers: [ GeocodingService, TranslateService ]
})
export class MaptapModule { 
    constructor(@Inject(DOCUMENT) private document: any){
        let fileref = document.createElement("link");
        fileref.rel = "stylesheet";
        fileref.type = "text/css";
        fileref.href = "https://unpkg.com/leaflet@1.0.3/dist/leaflet.css";
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}
