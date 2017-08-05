import { Component, Input, OnInit, OnDestroy} from "@angular/core"
import { Observable } from "rxjs/Observable"
import { Subscription } from "rxjs/Subscription"
import "rxjs/add/observable/interval"
import { PostmenService, Quotation } from "../shared/postmen.service";
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
  //@Currency() currency: string;

  public disableQuoteButton : boolean;
  private _isFormVisible : boolean;

  private _needQuoteUpdateSubscription : Subscription;
  private _quotesSubscription : Subscription;
  private _addressSubscription: Subscription;

  private _quotations : Quotation[]

  constructor( 
    private addrService : AddressService,
    private postmen : PostmenService){}

  ngOnInit() {
    this._needQuoteUpdateSubscription = this.postmen.needToUpdateQuotes$
      .subscribe( needUpdataQuotes => {
        this.disableQuoteButton = !needUpdataQuotes;
      });    
    this._quotesSubscription = this.postmen.rates$
      .subscribe( quotes => {
        this._quotations = quotes;
      })
    this._quotations = this.postmen.quotations
    this._addressSubscription = this.addrService.addressAssigned$
            .subscribe( address => {
                this._isFormVisible = address!=null ? true : false;
             });
  }
  ngOnDestroy() {
    this._needQuoteUpdateSubscription.unsubscribe();
    this._quotesSubscription.unsubscribe();
    this._addressSubscription.unsubscribe();
  }

  get quotations() : Quotation[] {
    return this.postmen.quotations;
  }

  get isVisible() : boolean {
    return this._isFormVisible;
  }

  updateShipmentQuotes() : void {
    this.disableQuoteButton = true;
    this.postmen.updateQuotes();
  }
}