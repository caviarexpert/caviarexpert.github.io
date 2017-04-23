import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@NgModule({
  imports:      [ CommonModule ],
  exports: [
        CommonModule,
        TranslateModule
    ],
  //providers: [TranslateService]
})
export class SharedModule { }