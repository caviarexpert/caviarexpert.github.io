import { Component, OnInit } from "@angular/core";
import { environment } from "../environment";
import { PaypalService } from "./paypal.service";
import { SessionService } from "../shared/session.service";

@Component({
    moduleId: module.id,
    selector: 'paypal',
    template: `<div id="paypal-button-container"></div>`
})
export class PaypalComponent implements OnInit {

  constructor(private paypalService : PaypalService, private sessionService : SessionService){}
  ngOnInit(){
    let theSession : SessionService = this.sessionService;
    this.paypalService.getPaypal().then( paypal => {
        paypal.Button.render({
          env: 'sandbox', // sandbox | production
          // Show the buyer a 'Pay Now' button in the checkout flow
          commit: true,
          // payment() is called when the button is clicked
          payment: function() {
              // Set up a url on your server to create the payment
              var CREATE_URL = environment.paypal.createPaymentUrl;
              // Make a call to your server to set up the payment
              //return paypal.request.post(CREATE_URL)
              let dataJson = JSON.stringify(theSession.getSessionData());
              console.log("Paypal data: ", dataJson );
              return paypal.request({ method: 'post', url: CREATE_URL, json: dataJson })
                    .then(function(res) {
                            return res.paymentID;
                        });
          },
          // onAuthorize() is called when the buyer approves the payment
          onAuthorize: function(data, actions) {
                // Set up a url on your server to execute the payment
                let EXECUTE_URL = environment.paypal.executePaymentUrl;
                // Set up the data you need to pass to your server
                console.log(data);
                let newData = {
                    paymentID: data.paymentID,
                    payerID: data.payerID
                };
                // Make a call to your server to execute the payment
                return paypal.request.post(EXECUTE_URL, newData)
                    .then(function (res) {
                        window.alert('Payment Complete!');
                    });
            }

        }, '#paypal-button-container');
    });
  }

}