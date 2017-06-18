import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { AddressObject } from "./geocode";
import { environment } from "../environment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PostmenService {
  constructor(private http: Http){}

  getQuote( address : AddressObject ) : Observable<any> {
    const quotationAddress : QuotationAddress = new QuotationAddress(
      address.route + ' ' + address.buildingNumber,
      address.locality,
      address.postalCode,
      address.countryCode
    );
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
      .map ( resp => resp.json() );
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