import { Component, OnInit, Inject } from '@angular/core';
import { ThemeService } from './theme.service';
import { Theme } from '../model/theme';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'theme-choose',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  private themesList: Theme[] = [
                               new Theme("cyborg", "https://bootswatch.com/4-alpha/cyborg/bootstrap.min.css"),
                               new Theme("cosmo", "https://bootswatch.com/4-alpha/cosmo/bootstrap.min.css"),
                               new Theme("cerulean", "https://bootswatch.com/4-alpha/cerulean/bootstrap.min.css"),
                               new Theme("lumen", "https://bootswatch.com/4-alpha/lumen/bootstrap.min.css"),
                               new Theme("slate", "https://bootswatch.com/4-alpha/slate/bootstrap.min.css"),
                               new Theme("pulse", "https://bootswatch.com/4-alpha/pulse/bootstrap.min.css"),
                               new Theme("simplex", "https://bootswatch.com/4-alpha/simplex/bootstrap.min.css")
                            ];
  constructor(@Inject(DOCUMENT) private document: any) { }
  

  ngOnInit() {
  }
  
  get themes(): Theme[]{
     return this.themesList;
  }
  
  setTheme(theme:Theme, $event: MouseEvent){
      $event.preventDefault();
      //$event.stopPropagation();
      let theme_css = document.getElementById("theme_css");
      theme_css.setAttribute("href", theme.url);
  }

}
