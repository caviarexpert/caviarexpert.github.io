import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { AddressObject } from "./geocode";
import { AddressService } from "./address.service"
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { EmptyObservable } from "rxjs/observable/EmptyObservable"
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/last';
//import 'rxjs/add/operator/onErrorResumeNext';

@Injectable()
export class PostmenService {

  private quotedAddress : AddressObject;
  private addressForQuote : AddressObject;


  private _needToUpdateQuotes: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public needToUpdateQuotes$ = this._needToUpdateQuotes.asObservable();

  private rates: BehaviorSubject<Quotation[]> = new BehaviorSubject<Quotation[]>([]);
  //private mapclickAssigned: Subject<boolean> = new Subject<boolean>();
  public rates$ = this.rates.asObservable();
  private static API_URL = environment.apiUrl + environment.postmen.quotationUrl;

  constructor(private http: Http, private addressService : AddressService ){
    this.addressService.addressAssigned$.subscribe ( addr => {
      if(addr===null){
        this._needToUpdateQuotes.next(false)
        this.rates.next([]);
        return
      }
      if(this.quotedAddress==null){
        this.addressForQuote = addr;
        this._needToUpdateQuotes.next(true)        
        return
      }
      const isNewArea : boolean = !AddressObject.isSamePostalArea(this.quotedAddress, addr)
      if(isNewArea){
        this.addressForQuote = addr;
      }
      this._needToUpdateQuotes.next(isNewArea);
    });
  }

  get quotations() : Quotation[] { return this.rates.value }

  updateQuotes ( ) : void {
    if( this.addressForQuote == null ) return
    const updatedQuotes : Quotation[] = [];
    this._getQuotes( this.addressForQuote ).subscribe ( 
        resp => {
          console.log("Adding quote ", resp);
          this.rates.next([...updatedQuotes, ...resp.rates]);
          console.log("Now quotes: ", this.rates.value);
        },
        error => { console.error("AVE error:", error) },
        () => {
          this.quotedAddress = this.addressForQuote;
        }
      );
  }

  //isQuotesUpdateRequired() : boolean {
  //  return this._needToUpdateQuotes.value;
  //}

  hasSomeAddress() : boolean {
    return !!this.addressForQuote || !!this.quotedAddress;
  }

  //clearQuotes () : void {
  //  this._quotes = []
    //this.ratesAssigned.next(null);
  //}

  //get quotations() : QuotationResponse[] {
  //  return this._quotes;
 // }

  _getQuotes ( address : AddressObject ) : Observable<QuotationResponse> {
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
            url: PostmenService.API_URL,
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
            url: PostmenService.API_URL,
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
  errors: string[];
  rates : Quotation[];
}

export class Quotation {
  deliveryDate : string
	serviceName : string
	priceCurrency : string
	price : number
	courierSlug : string
}