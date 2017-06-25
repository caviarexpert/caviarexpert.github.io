import { Injectable, Inject } from "@angular/core";

import { DOCUMENT } from "@angular/platform-browser";
import { environment } from "../../environments/environment";


@Injectable()
export class PaypalService {

  private paypalPromise : Promise<any>;

  constructor( @Inject(DOCUMENT) theDocument : any){
    this.paypalPromise = new Promise( ( resolve, reject ) => {
        let paypal = theDocument.createElement("script");
        paypal.src = "https://www.paypalobjects.com/api/checkout.js";
        paypal.type = "text/javascript";        
        paypal.onload = () => {
          resolve( (<any>window).paypal );
        }
        paypal.onerror = () => {
          reject();
        }
        theDocument.getElementsByTagName("head")[0].appendChild(paypal);
    });
  }

  getPaypal() : Promise<any> {
    return this.paypalPromise;
  }
}