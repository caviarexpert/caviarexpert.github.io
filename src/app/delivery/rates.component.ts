import { Component, Input, OnInit, OnDestroy} from "@angular/core"
import { Observable } from "rxjs/Observable"
import { Subscription } from "rxjs/Subscription"
import { Quotation } from "../shared/postmen.service";
import "rxjs/add/observable/interval"
import { PostmenService, QuotationResponse } from "../shared/postmen.service";
import { AddressService } from "../shared/address.service"
import { AddressObject } from "../shared/geocode"
import {
    Language,
    DefaultLocale,
    Currency
} from 'angular-l10n';


@Component({
    moduleId: module.id,
    selector: 'shipment-rates',
    templateUrl: "./rates.component.html"
})

export class RatesComponent implements OnInit, OnDestroy {

  @Language() lang: string;
  @DefaultLocale() defaultLocale: string;
  @Currency() currency: string;

  public address : AddressObject;
  private _addressSubscription : Subscription
  private _rateSubscription : Subscription

  private _quotations : QuotationResponse[] = [];
  public quotesUpdated : boolean = false;

  constructor( private postmen : PostmenService,
      private addrService : AddressService){
  }

  ngOnInit() {
    this._addressSubscription = this.addrService.addressAssigned$
      .subscribe( address => {
        const isSameArea : boolean = AddressObject.isSamePostalArea(this.address, address);
        this.quotesUpdated = isSameArea;
        if(!this.quotesUpdated){
          this._quotations = [];
        }
        this.address = address
      });
    this._rateSubscription = this.postmen.ratesAssigned$
      .subscribe( qr => {
        this._quotations.push(qr);
      });
  }
  ngOnDestroy() {
    this._addressSubscription.unsubscribe();
  }

  get quotations() : QuotationResponse[] {
    return this._quotations;
  }

  updateShipmentQuotes() : void {
    this.quotesUpdated = true;
    this.postmen.updateQuotes( this.address );
  }
}