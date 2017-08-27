import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod,
    Headers, Response, RequestOptions,
    URLSearchParams } from '@angular/http';
import { TranslationService, Collator} from 'angular-l10n';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export const countries: string[] = ['GB', 'DE', 'FR', 'IT', 'ES', 'PT', 'NL', 'BE', 'LU', 'DK',
    'PL', 'CZ', 'EE', 'LT', 'LV', 'AT'];

@Injectable()
export class DeliveryService {
    private _countries: CountryEntity[];
    private _topoJson: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private isTopoJsonLoaded = false;
    constructor(private http: Http, private translation: TranslationService, private collator: Collator) {
        this.translation.translationChanged.subscribe(
            () => this._makeCountriesList()
        );
        this._makeCountriesList();
    }
    get countries() {
        return this._countries;
    }

    get topojson(): Observable<any> {
        if (!this.isTopoJsonLoaded) {
            this.isTopoJsonLoaded = true;
            const postHeaders: Headers = new Headers();
            postHeaders.append('Content-Type', 'application/json');
            postHeaders.append('Accept', 'application/json');
            const requestOptions: RequestOptions = new RequestOptions({
                method: RequestMethod.Get,
                url: '/assets/geo/countries.topo.json',
                headers: postHeaders
            });
            const req: Request = new Request(requestOptions);
            this.http.request(req)
                .map ( resp => this._topoJson.next( resp.json() ) )
                .subscribe();
        }
        return this._topoJson.asObservable();
    }

    private _makeCountriesList() {
        this._countries = countries.map( code =>
                    new CountryEntity(code, this.translation.translate('COUNTRY.' + code))
                );
        this.collator.sort(
                    this._countries,
                    'name',
                    'asc',
                    '',
                    { sensitivity: 'variant' }
                );
    }
}

export class CountryEntity {
    constructor(private countryCode: string, private countryName: string ) {}
    get name(){
        return this.countryName;
    }
    get code(){
        return this.countryCode;
    }
}
