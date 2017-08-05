import {Component, ViewChild, OnInit, OnDestroy} from "@angular/core";
import { SessionService, SessionObject } from '../shared/session.service'
import { Http, Request, RequestMethod, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { EmptyObservable } from "rxjs/observable/EmptyObservable"
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/last';

@Component({
    moduleId: module.id,
    selector: 'invoice',
    templateUrl: "./invoice.component.html"
})
export class InvoiceComponent implements OnInit {
    private static INVOICE_API_URL = environment.apiUrl + environment.invoice.path;
    private _sessionObject : SessionObject
    private _invoice : any
    constructor(sessionService : SessionService, private http: Http){
      this._sessionObject = sessionService.getSessionObject();
    }

    ngOnInit() : void {
      this.getInvoice()
      this._getInvoice().subscribe( invoice => {
        this._invoice = invoice;
      });
    }
    
    get sessionData() : string { return JSON.stringify(this._sessionObject) }
    get invoice() : any { return this._invoice };

    public getInvoice() : void {
        console.info("Session data: ", this._sessionObject);        
    }

    private _getInvoice( ) : Observable<any> {
      const postHeaders : Headers = new Headers()
      postHeaders.append("Content-Type", "application/json");
      postHeaders.append("Accept", "application/json");
      const requestOptions : RequestOptions = new RequestOptions({
              method: RequestMethod.Post,
              url: InvoiceComponent.INVOICE_API_URL,
              headers: postHeaders,
              body: ''
      })
      const req : Request = new Request(requestOptions);
      return this.http.request(req)
        //.map ( resp =>  Object.assign( new QuotationResponse(), resp.json() ) );
        .map ( resp => JSON.stringify(resp.json()) );
    }
}