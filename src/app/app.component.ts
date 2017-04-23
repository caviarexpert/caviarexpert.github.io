import { Component, OnInit } from '@angular/core';
import {TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-root",
  //template: "<router-outlet></router-outlet>"
  template: `<navigation-bar></navigation-bar>
  <store-area></store-area>`
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private translateService: TranslateService){}

  ngOnInit(){
        this.translateService.setDefaultLang("en");
        let brLang = this.translateService.getBrowserLang();
        console.debug("Browser language: ", brLang);
        this.translateService.use(brLang);
    }
}
