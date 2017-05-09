import { Component, OnInit } from '@angular/core';
import {TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-root",
  //template: "<router-outlet></router-outlet>"
  template: `
    <section class="pt-5 fill">
      <navigation-bar></navigation-bar>
      <router-outlet></router-outlet>
    </section>`
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private translateService: TranslateService){}

  ngOnInit(){}
        
}
