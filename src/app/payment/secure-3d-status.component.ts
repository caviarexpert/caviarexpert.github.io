import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from "./stripe.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/mergeMap';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/flatMaps';


@Component({
    moduleId: module.id,
    templateUrl: "./secure-3d-status.component.html"
})
export class Secure3DStatusComponent implements OnInit {

    constructor(route: ActivatedRoute, router: Router, stripeService: StripeService){
        route.queryParams
            .mergeMap (params => {
                let token = params['source'];
                let cs = params['client_secret'];
                console.log("source: ", token, " cs: ", cs);
                return stripeService.sendChargable(token, cs);                    
            })
            .subscribe(resp => router.navigateByUrl("/payment/thanks")); 
            /*
            .subscribe ( params => {
                let token = params['source'];
                let cs = params['client_secret'];
                console.log("source: ", token, " cs: ", cs);
                stripeService.sendChargable(token, cs)
                    .subscribe(resp => {
                        router.navigateByUrl("/payment/thanks");
                    });
            });
            */
    }
    ngOnInit(){

    }
}