import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MaptapComponent } from "./maptap.component";
import { GeocodingService } from "./geocoding.service";

import { routing } from "./maptap.routing";


@NgModule({
    imports: [ HttpModule, routing ],
    declarations: [MaptapComponent],
    exports: [MaptapComponent],
    providers: [ GeocodingService ]
})
export class MaptapModule { }
