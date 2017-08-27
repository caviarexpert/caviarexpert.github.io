import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PostmenService } from '../shared/postmen.service';


@Injectable()
export class DeliveryComponentService {
    // public disableQuoteButton: boolean;
    private _needQuoteUpdateSubscription: Subscription;
    private disableRequestQuotation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public disableQuotation$ = this.disableRequestQuotation.asObservable();

    constructor(private postmen: PostmenService) {
        this._needQuoteUpdateSubscription = this.postmen.needToUpdateQuotes$
            .subscribe( needUpdataQuotes => {
                this.disableRequestQuotation.next( !needUpdataQuotes );
            });
    }

    set quotationDisabled( val: boolean ){
        this.disableRequestQuotation.next(val);
    }
}
