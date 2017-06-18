import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { environment } from "../environment";

import { Observable } from "rxjs/Observable";
import { SessionService } from "../shared/session.service";


@Injectable()
export class StripeService {

  constructor(
      private http: Http,
      private sessionService : SessionService){}
  
  sendCardSource ( id: string) : Observable<any> {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    const params: URLSearchParams = new URLSearchParams();
    params.set("id", id);

    //this.http.post(url, JSON.stringify(data), {headers:{'Content-Type': 'application/json'}})
    //this.http.get(environment.stripe.processCardUrl, new RequestOptions({search: params}) )
    const requestOptions : RequestOptions = new RequestOptions({
            method: RequestMethod.Post,
            url: environment.stripe.processCardUrl,
            headers: new Headers([{"Content-Type": "application/json"}]),
            search: params,
            body: JSON.stringify(this.sessionService.getSessionData())
        })
    //return this.http.get(environment.stripe.processCardUrl, new RequestOptions({search: params}) )
    const req : Request = new Request(requestOptions);
    return this.http.request(req)
      .map ( resp => resp.json() );
  }

  sendChargable( id: any, cs: any) : Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set("id", id);
    params.set("cs", cs);
    return this.http.get(environment.stripe.chargeCardUrl, new RequestOptions({search: params}) )
      .map ( resp => resp.json());
  }
}
