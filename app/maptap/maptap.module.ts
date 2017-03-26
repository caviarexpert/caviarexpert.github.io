import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ModelModule } from "../model/model.module";
import { MapTapComponent } from "./maptap.component";
import { GeocodingService } from "./geocoding.service";


@NgModule({
    imports: [ HttpModule ],
    declarations: [MapTapComponent],
    exports: [MapTapComponent],
    providers: [ GeocodingService ]
})
export class MapTapModule { }