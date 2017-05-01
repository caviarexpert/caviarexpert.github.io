import { Component, OnInit } from '@angular/core';
import {TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-root",
  //template: "<router-outlet></router-outlet>"
  template: `<navigation-bar></navigation-bar>
    <section class="mt-5">
      <router-outlet></router-outlet>
    </section>`
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private translateService: TranslateService){}

  ngOnInit(){
        this.translateService.setTranslation("de", {});
        this.translateService.setTranslation("en", {});
        this.translateService.setTranslation("es", { });
        this.translateService.setTranslation("fr", {});        
        this.translateService.setTranslation("it", {});
        this.translateService.setTranslation("ru", {});
        this.translateService.setDefaultLang("en");
        let brLang = this.translateService.getBrowserLang();
        this.translateService.use(brLang);  
    }
}
