import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocaleService, TranslationService } from "angular-l10n";
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";



@Injectable()
export class GeocodingService{

    constructor(private http: Http, private locale: LocaleService, private translationService: TranslationService ){}

    getAddress(lat : string, lng : string): Observable<any[]> {
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set("latlng", lat + "," + lng);
        searchParams.set("key", environment.googleMapApiKey);
        searchParams.set("language", this.locale.getCurrentLanguage());
        let requestOptions = new RequestOptions();
        requestOptions.search = searchParams;
        return this.http.get(environment.googleMapApiUrl, new RequestOptions({search: searchParams}))
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
        searchParams.set("key", environment.googleMapApiKey);
        searchParams.set("language", this.locale.getCurrentLanguage());
        let requestOptions = new RequestOptions();
        requestOptions.search = searchParams;
        return this.http.get(environment.googleMapApiUrl, new RequestOptions({search: searchParams}))
            .map( res => res.json().results || []);
    }

    getSharedLocale() : LocaleService {
        return this.locale;
    }
    getSharedTranslation(): TranslationService {
        return this.translationService;
    } 
}