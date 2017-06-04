import { Component, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import {NgForm} from "@angular/forms";
import { GeocodingService } from "../shared/geocoding.service";
import { AddressService } from "../shared/address.service";
import { GeocodeResponse, GeocodeResult} from "../shared/geocode";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

@Component({
    moduleId: module.id,
    selector: 'map-control',
    templateUrl: "./map-control.component.html"
})
export class MapControlComponent implements AfterViewInit{

    @ViewChild('mapControlHtml') mapControlHtml: ElementRef

    constructor(private addressService : AddressService){}

    ngAfterViewInit(){

    }

    public getHtml(): any {
        return this.mapControlHtml.nativeElement;
    }
}