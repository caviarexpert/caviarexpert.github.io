import { Component, trigger, state, style, transition, animate  } from "@angular/core";
/**
 * Consider transition https://plnkr.co/edit/RZ1v9M?p=preview
 * http://www.nganimate.org/angularjs/ng-switch/slider-css3-transition-animation
 * https://desandro.github.io/3dtransforms/examples/card-01.html
 * http://jsfiddle.net/MEmnc/9/
 */
@Component({
    selector: "cart-summary",
    moduleId: module.id,
    templateUrl: "./cart-summary.component.html",
    styleUrls: ["./cart-summary.component.css"]
    /*
    animations: [
        trigger('flipState', [
        state('*', style({
            transform: 'rotateY(360deg)'
        })),
        //state('inactive', style({
        //    transform: 'rotateY(0deg)'
        //})),

        transition('* <=> *', animate('1000ms ease-out')),
        //transition('inactive => active', animate('1000ms ease-in'))
    ]) 
  ]*/
})
export class CartSummaryComponent {
    public singleModel: string = '1';
    flip: string = 'inactive';
    constructor() { }

    toggleCart(){
        console.log("Toggle");
        this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    }
}