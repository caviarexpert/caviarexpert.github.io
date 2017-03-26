import { Component } from "@angular/core";

@Component({
  template: `<header><h3 class="bg-info p-a-1">Checkout Component</h3></header>
  <a class="btn btn-sm bg-inverse" routerLink="/map">Choose address</a>`
})
export class CheckoutComponent { }