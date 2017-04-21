import { Injectable } from '@angular/core';
import { StaticDataSource } from '../model/static.datasource';
import { Theme } from '../model/theme';


@Injectable()
export class ThemeService {
  
  
  constructor(private repository: StaticDataSource) { }
  
  getTheme( theme: string = 'cyborg'): string{
      return this.repository.getThemes().find( t => t.id == theme ).url;
  }
  
  getThemes(): Theme[] {
      return this.repository.getThemes();
  }
  

}
