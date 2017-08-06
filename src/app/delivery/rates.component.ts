import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import {
    Language,
    DefaultLocale,
    Currency
} from 'angular-l10n';

import { DeliveryComponentService } from './delivery-component.service';
import { PostmenService, Quotation } from '../shared/postmen.service';
import { AddressService } from '../shared/address.service';
import { AddressObject } from '../shared/geocode';



@Component({
    moduleId: module.id,
    selector: 'app-shipment-rates',
    templateUrl: './rates.component.html'
})

export class RatesComponent implements OnInit, OnDestroy {

  @Language() lang: string;
  @DefaultLocale() defaultLocale: string;
  // @Currency() currency: string;

  public disableQuoteButton: boolean;
  private _isFormVisible: boolean;

  // private _needQuoteUpdateSubscription: Subscription;
  private _quotesSubscription: Subscription;
  private _addressSubscription: Subscription;
  private _quotationEnabledSubscription: Subscription;

  private _quotations: Quotation[]

  constructor (
    private addrService: AddressService,
    private postmen: PostmenService,
    private deliveryComponentService: DeliveryComponentService) {}

  ngOnInit() {
    /* this._needQuoteUpdateSubscription = this.postmen.needToUpdateQuotes$
      .subscribe( needUpdataQuotes => {
        this.disableQuoteButton = !needUpdataQuotes;
      }); */
    this._quotationEnabledSubscription = this.deliveryComponentService.disableQuotation$
      .subscribe ( val => {
          this.disableQuoteButton = val;
      });
    this._quotesSubscription = this.postmen.rates$
      .subscribe( quotes => {
        this._quotations = quotes;
      });
    this._quotations = this.postmen.quotations;
    this._addressSubscription = this.addrService.addressAssigned$
            .subscribe( address => {
                this._isFormVisible = address != null ? true : false;
             });
  }
  ngOnDestroy() {
    // this._needQuoteUpdateSubscription.unsubscribe();
    this._quotesSubscription.unsubscribe();
    this._addressSubscription.unsubscribe();
    this._quotationEnabledSubscription.unsubscribe();
  }

  get quotations(): Quotation[] {
    return this.postmen.quotations;
  }

  get isVisible(): boolean {
    return this._isFormVisible;
  }

  updateShipmentQuotes(): void {
    this.deliveryComponentService.quotationDisabled = true;
    this.postmen.updateQuotes();
  }
}
