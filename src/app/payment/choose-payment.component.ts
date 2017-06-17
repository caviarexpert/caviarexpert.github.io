import { Component, OnInit } from "@angular/core";
import { SessionService } from "../shared/session.service";


@Component({
    moduleId: module.id,
    selector: 'choose-payment',
    templateUrl: "./choose-payment.component.html"
})
export class ChoosePaymentComponent implements OnInit {
    constructor( private sessionService : SessionService ){}

    ngOnInit(){
        this.sessionService.saveSession();
    }
}