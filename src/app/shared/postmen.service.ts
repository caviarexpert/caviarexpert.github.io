import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { AddressObject } from "./geocode";
import { environment } from "../environment";
import { Observable } from "rxjs/Observable";
import { EmptyObservable } from "rxjs/observable/EmptyObservable"
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/onErrorResumeNext';

@Injectable()
export class PostmenService {
  constructor(private http: Http){}

  getQuotes ( address : AddressObject ) : Observable<QuotationResponse> {
    console.log("Getting quotes")
    const quotationAddress : QuotationAddress = new QuotationAddress(
      address.route + ' ' + address.buildingNumber,
      address.locality,
      address.postalCode,
      address.countryCode
    );
    return this._getSlugs( quotationAddress )
      .flatMap ( quotationResponse => quotationResponse.slugs )
      .flatMap (slug => {
        console.log("Quote of ", slug);
        return this._getCourierRates ( quotationAddress, slug);
      })
    
  }
  
  _getCourierRates( quotationAddress : QuotationAddress, slug : string ) : Observable<QuotationResponse> {
    const postHeaders : Headers = new Headers()
    postHeaders.append("Content-Type", "application/json");
    postHeaders.append("Accept", "application/json");

    const searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set("slug", slug);

    const requestOptions : RequestOptions = new RequestOptions({
            method: RequestMethod.Post,
            url: environment.postmen.quotationUrl,
            headers: postHeaders,
            body: quotationAddress,
            search: searchParams
    })
    const req : Request = new Request(requestOptions);
    return this.http.request(req)      
      .map ( resp => Object.assign( new QuotationResponse(), resp.json() ) )
      .catch ( err => new EmptyObservable())
  }

  private _getSlugs( quotationAddress : QuotationAddress ) : Observable<QuotationResponse> {
    const postHeaders : Headers = new Headers()
    postHeaders.append("Content-Type", "application/json");
    postHeaders.append("Accept", "application/json");
    const requestOptions : RequestOptions = new RequestOptions({
            method: RequestMethod.Post,
            url: environment.postmen.quotationUrl,
            headers: postHeaders,
            body: quotationAddress
    })
    const req : Request = new Request(requestOptions);
    return this.http.request(req)
      .map ( resp =>  Object.assign( new QuotationResponse(), resp.json() ) );
  }

}

export class QuotationAddress {
    constructor(
        public streetAddress: string,
        public locality : string,
        public postalCode : string,
        public contryCode : string        
    ){}
}

export class QuotationResponse {
  slugs : string[];
  rates : Quotation[];
}

export class Quotation {
  deliveryDate : string
	serviceName : string
	priceCurrency : string
	price : number
	courierSlug : string
}