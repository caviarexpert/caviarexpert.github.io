import { Component, OnInit } from '@angular/core';

import {
    LocaleService,
    TranslationService,
    IntlAPI,
    Collator,
    Language,
    DefaultLocale,
    Currency
} from 'angular-l10n';

@Component({
  selector: "app-root",
  template: `<section class="pt-5 fill"><navigation-bar></navigation-bar><router-outlet></router-outlet></section>`
  /*
  template: `
      <navigation-bar></navigation-bar>
      <p translate>Hello</p>  
      <p translate>STORE.Caviar</p>
      <p localeDate="fullDate">{{ today }}</p>
      <p>intlAPI: {{ intlAPI }}</p>
      <p>Lang: {{ lang }} </p>
      <p>Locale: {{ defaultLocale }} </p>
      <p>Currencty: {{ currency}} </p>
      {{ 'STORE.Caviar' | translate:lang }}
      {{ today | localeDate:defaultLocale:'fullDate' }}
      <p>languageCodes: {{ languageCodes }}</p>
      <strong translate>App translate</strong>
    `
  */  
})
export class AppComponent implements OnInit {
    @Language() lang: string;
    @DefaultLocale() defaultLocale: string;
    @Currency() currency: string;
    
    enlang: string = "en";

    intlAPI: boolean;

    today: number;
    pi: number;
    a: number;
    b: number;

  constructor(private locale: LocaleService, private translate: TranslationService){
    console.dir(this.locale);
    console.dir(this.translate);
  }

  ngOnInit(): void{
        this.today = Date.now();
        this.pi = 3.14159;
        this.a = Math.round(Math.random() * 100) / 100;
        this.b = Math.round(Math.random() * 1000000) / 100;
        this.intlAPI = false;
  }

  private _hasIntlApi(): boolean {
      try{
        return IntlAPI.hasDateTimeFormat() && IntlAPI.hasNumberFormat() && IntlAPI.hasCollator();    
      }catch(e){
        return false;
      }
  }

  get languageCodes(): string[]{
    return this.locale.getConfiguration().languageCodes.map( lc => lc.code);
  }
        
}
