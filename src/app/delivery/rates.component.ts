import { Component } from "@angular/core"
import { Observable } from "rxjs/Observable"
import { Quotation } from "../shared/postmen.service";

@Component({
    moduleId: module.id,
    selector: 'shipment-rates',
    templateUrl: "./rates.component.html"
})

export class RatesComponent {
  rates : Observable<Quotation>
}