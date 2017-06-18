import { Component, OnInit, Inject, NgZone, ChangeDetectorRef } from "@angular/core";
import {NgForm} from "@angular/forms";
//import {  FormControl, FormGroup } from '@angular/forms';

import { DOCUMENT } from "@angular/platform-browser";

import { StripeService } from "./stripe.service";
import { SessionService } from "../shared/session.service";



@Component({
    moduleId: module.id,
    selector: 'stripe',
    templateUrl: "./stripe.component.html",
    styleUrls: ["./stripe.component.css"]
})
export class StripeComponent implements OnInit {
 // heroForm = new FormGroup ({
 //   name: new FormControl()
 // });
  public cardMask = [/[1-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
  public cvcMask = [/\d/, /\d/, /\d/]
  public twoDigitsMask = [/\d/, /\d/]
  cardNumber: string = "4000000000003063";
  expiryMonth: string = "12"
  expiryYear: string = "20"
  cvc: string = "123"

  message: string;

  cardError: string;

  constructor(
        private stripeService : StripeService,
        private sessionService: SessionService,
        private changeDetector: ChangeDetectorRef,
        private zone: NgZone,
        @Inject(DOCUMENT) private theDocument: any ){}

  ngOnInit(){

  }

  getToken() {
    this.message = 'Loading...';
    (<any>window).Stripe.source.create({
        type: 'card',
        card: {
            number: this.cardNumber,
            cvc: this.cvc,
            exp_month: this.expiryMonth,
            exp_year: this.expiryYear,
        },
        owner: {
            address: {
                postal_code: ""
            }
        }
    }, (status: number, response: any) => {
        console.log(response);
        this.sessionService.getSessionData();
        this.message = JSON.stringify(response);
        this.changeDetector.detectChanges();//.markForCheck();
        this.stripeService.sendCardSource(response.id)
            .subscribe ( result => {
                console.log("redirecting to ....", result.redirect3dUrl);
                window.location.href=result.redirect3dUrl;
            });

        //this.zone.run(() => this.message = JSON.stringify(response));        
        /*
        if (status === 200) {
            this.message = `Success! Card token ${response}.`;
        } else {
            this.message = response.error.message;
        }
        */

    });
/*
    Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        this.message = `Success! Card token ${response.card.id}.`;
      } else {
        this.message = response.error.message;
      }
    });
*/
  }

  stripeTokenHandler(token) : void {
    	  // Insert the token ID into the form so it gets submitted to the server
    	  var form = this.theDocument.getElementById('payment-form');
    	  var hiddenInput = this.theDocument.createElement('input');
    	  hiddenInput.setAttribute('type', 'hidden');
    	  hiddenInput.setAttribute('name', 'stripeToken');
    	  hiddenInput.setAttribute('value', token.id);
    	  form.appendChild(hiddenInput);
    	  // Submit the form
    	  //form.submit();
    }

    sendPayment() : void {
        let cardnumberInput : any = this.theDocument.getElementsByName("cardnumber")[0];
        this.cardNumber = cardnumberInput.value;
        console.log("Cardnumber:", this.cardNumber);
        /*
        stripe.source.create({
            type: 'card',
            card: {
                number: $('.card-number').val(),
                cvc: $('.card-cvc').val(),
                exp_month: $('.card-expiry-month').val(),
                exp_year: $('.card-expiry-year').val(),
            },
            owner: {
                address: {
                postal_code: $('.address_zip').val()
                }
            }
            }, stripeResponseHandler);
        }
        */
    }
}