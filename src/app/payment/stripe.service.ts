import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { environment } from "../environment";

import { Observable } from "rxjs/Observable";


@Injectable()
export class StripeService {

  constructor(private http: Http){}
  
  sendCardSource ( id: string) : Observable<any> {
    debugger;
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    let params: URLSearchParams = new URLSearchParams();
    params.set("id", id);
    return this.http.get(environment.processCardUrl, new RequestOptions({search: params}) )
      .map ( resp => resp.json());
  }
}
