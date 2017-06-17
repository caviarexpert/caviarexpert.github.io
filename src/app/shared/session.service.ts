import { Injectable } from "@angular/core";

@Injectable()
export class SessionService {

  private sessionId : string;
  private dataProviders : SessionDataProvider[] = [];

  registerProvider( dataProvider : SessionDataProvider ){
    this.dataProviders.push(dataProvider);
  }

  saveSession() : void {
    this.dataProviders.forEach( provider => {
      console.log("Saving data from", provider().provider);
    });
  }

}

export interface SessionDataProvider {
  () : SessionData;
}
export class SessionData {  
  constructor(private providerName: string, private serviceData : any){}
  get provider() : string {
    return this.providerName;
  }
  get data() : any {
    return this.serviceData;
  }
}