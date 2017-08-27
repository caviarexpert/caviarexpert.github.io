import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  private sessionId: string;
  private dataProviders: SessionDataProvider[] = [];

  registerProvider( dataProvider: SessionDataProvider ) {
    this.dataProviders.push(dataProvider);
  }

  getSessionData(): SessionData[] {
    return this.dataProviders.map ( provider => {
      const sessionData: SessionData = provider();
      return sessionData;
     });
  }

  getSessionObject(): SessionObject {
    return this.getSessionData().reduce(
      (sessionObject, currentSessionData ) => sessionObject.addData(currentSessionData.provider, currentSessionData.data),
      new SessionObject()
    );
  }


}

export type SessionDataProvider = () => SessionData;

export class SessionData {
  constructor(public provider: string, public data: any) {}
}
export class SessionObject {
  public cart: any;
  public address: any;
  addData( provider: string, data: any) {
    switch ( provider) {
      case 'cart' : {
        this.cart = data;
        break;
      }
      case 'address' : {
        this.address = data;
        break;
      }
    }
    return this;
  }
}
