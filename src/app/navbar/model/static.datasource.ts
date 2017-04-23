import { Injectable } from '@angular/core';
import { Theme } from "./theme";

@Injectable()
export class StaticDataSource {
    
    private themes: Theme[] = [
       new Theme("cyborg", "https://bootswatch.com/4-alpha/cyborg/bootstrap.min.css"),
       new Theme("cosmos", "https://bootswatch.com/4-alpha/cosmos/bootstrap.min.css")
    ];

  constructor() { }
  
  getThemes(): Theme[] {
      return this.themes;
  }

}
