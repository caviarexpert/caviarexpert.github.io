import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocaleService, TranslationService } from "angular-l10n";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from "../environment";



@Injectable()
export class GeocodingService{
    public API_URL : string = "https://maps.googleapis.com/maps/api/geocode/json";

    constructor(private http: Http, private locale: LocaleService, private translationService: TranslationService ){}

    getAddress(lat : string, lng : string): Observable<any[]> {
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set("latlng", lat + "," + lng);
        searchParams.set("key", environment.googleMapApiKey);
        searchParams.set("language", this.locale.getCurrentLanguage());
        let requestOptions = new RequestOptions();
        requestOptions.search = searchParams;
        return this.http.get(this.API_URL, new RequestOptions({search: searchParams}))
            .map( res => res.json().results || []);
        /*
        .subscribe(
            (response) => {
                console.log(response.json())
            }, 
            (error) => console.log(error.json()), 
            () => console.info("completed")
        );
        */
    }

    getLocation(address: string): Observable<any[]> {
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set("address", address);
        searchParams.set("key", "AIzaSyCT8piTVujZwgJctZBoS8HHSYkXg20xyos");
        searchParams.set("language", this.locale.getCurrentLanguage());
        let requestOptions = new RequestOptions();
        requestOptions.search = searchParams;
        return this.http.get(this.API_URL, new RequestOptions({search: searchParams}))
            .map( res => res.json().results || []);
    }

    getSharedLocale() : LocaleService {
        return this.locale;
    }
    getSharedTranslation(): TranslationService {
        return this.translationService;
    } 
}