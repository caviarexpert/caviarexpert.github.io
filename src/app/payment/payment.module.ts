import { NgModule, Inject } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { GeocodingService } from "../shared/geocoding.service";
import { TranslationService, TranslationModule, LocalizationModule, LocaleService } from "angular-l10n";
import { routing } from "./payment.routing";
import { HttpModule } from "@angular/http";
import { ChoosePaymentComponent } from "./choose-payment.component";
import { StripeComponent } from "./stripe.component";
import { Secure3DStatusComponent } from "./secure-3d-status.component";
import { PaypalComponent } from "./paypal.component";
import { environment } from "../environment";
import { StripeService } from "./stripe.service";
import { PaypalService } from "./paypal.service";
import { ThanksComponent } from "./thanks.component";
import { Observable } from "rxjs/Observable";

@NgModule({
    imports: [ HttpModule, FormsModule, ReactiveFormsModule, routing, SharedModule, LocalizationModule.forChild() ],
    declarations: [ ChoosePaymentComponent, StripeComponent, Secure3DStatusComponent, PaypalComponent, ThanksComponent ],
    exports: [],
    providers: [ StripeService, PaypalService ]
})
export class PaymentModule{
      constructor(private translation: TranslationService,
                  private locale: LocaleService,
                  private geocodingService : GeocodingService,
                  private paypalService : PaypalService ){

        //<script type="text/javascript" src="https://js.stripe.com/v2/"></script>
        //<script src="https://js.stripe.com/v3/"></script>              
        
        let stripe = document.createElement("script");
        stripe.src = "https://js.stripe.com/v2/";
        stripe.type = "text/javascript";

        Observable.create( observer => {
            stripe.onload = () => {
                observer.next(true);
                observer.complete();
            }
            document.getElementsByTagName("head")[0].appendChild(stripe);
        }).subscribe( 
            s => {},
            error => {},
            () => {(<any>window).Stripe.setPublishableKey(environment.stripe.apiKey);}
        );
        
        this.locale.addConfiguration().defineDefaultLocale(
            this.geocodingService.getSharedLocale().getCurrentLanguage(),
            this.geocodingService.getSharedLocale().getCurrentCountry()
        );
        this.locale.init();
        this.geocodingService.getSharedLocale().defaultLocaleChanged.subscribe ( data => {
            //TODO better parse data (en-GB)
            let countryCode = this.geocodingService.getSharedLocale().getCurrentCountry();
            let langCode = this.geocodingService.getSharedLocale().getCurrentLanguage();
            this.locale.setDefaultLocale(langCode, countryCode);
        });
        this.translation.addConfiguration() 
            .addProvider("./assets/l10n/payment/locale-")
        this.translation.init();        
    }
}