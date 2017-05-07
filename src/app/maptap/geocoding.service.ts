import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import {TranslateService } from '@ngx-translate/core';


@Injectable()
export class GeocodingService{
    public API_URL : string = "https://maps.googleapis.com/maps/api/geocode/json";

    constructor(private http: Http, private translate: TranslateService){}

    getGeocoding(lat : string, lng : string): any {
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set("latlng", lat + "," + lng);
        searchParams.set("key", "AIzaSyCT8piTVujZwgJctZBoS8HHSYkXg20xyos");
        searchParams.set("language", this.translate.currentLang);
        let requestOptions = new RequestOptions();
        requestOptions.search = searchParams;
        this.http.get(this.API_URL, new RequestOptions({
            search: searchParams
        })).subscribe(
            (response) => {
                console.log(response.json())
            }, 
            (error) => console.log(error.json()), 
            () => console.info("completed")
        );
    }
}