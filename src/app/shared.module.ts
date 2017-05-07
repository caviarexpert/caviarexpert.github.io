import { NgModule, Injectable, ModuleWithProviders }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import {TranslateModule, TranslateService} from '@ngx-translate/core';


@NgModule({
  //imports:      [ CommonModule ],
  //providers: [TranslateService]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
      console.log("SharedModule.forRoot()");
      return {
        ngModule: SharedModule,
        providers: [ AddressService ]
      };
  }

 }

@Injectable()
export class AddressService {
  constructor(){
    console.log("AddressService created")
  }
  private value : string = "Address";

  get address(): string {
    return this.value;
  }
  set address(newAddress : string){
    console.log("new address: ", newAddress, " old: ", this.value);
    this.value = newAddress;
  }
}