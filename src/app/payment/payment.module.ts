import { NgModule, Inject } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { GeocodingService } from "../shared/geocoding.service";
import { TranslationService, TranslationModule, LocalizationModule, LocaleService } from "angular-l10n";
import { routing } from "./payment.routing";
import { HttpModule } from "@angular/http";
import { ChoosePaymentComponent } from "./choose-payment.component";
import { StripeComponent } from "./stripe.component";
import { environment } from "../environment";
import { StripeService } from "./stripe.service";

export const Stripe = (<any>window).Stripe;

@NgModule({
    imports: [ HttpModule, FormsModule, ReactiveFormsModule, routing, SharedModule, LocalizationModule.forChild() ],
    declarations: [ ChoosePaymentComponent, StripeComponent ],
    exports: [],
    providers: [ StripeService ]
})
export class PaymentModule{
      constructor(private translation: TranslationService,
                  private locale: LocaleService,
                  private geocodingService : GeocodingService ){
        
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
        (<any>window).Stripe.setPublishableKey(environment.stripeApiKey);
    }
}