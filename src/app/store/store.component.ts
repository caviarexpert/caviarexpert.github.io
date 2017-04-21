import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: "store",
    moduleId: module.id,
    templateUrl: "./store.component.html"
})
export class StoreComponent {
    public radioModel: string = 'Middle';
    private productList: string[] = ["Hello", "List"];

    constructor(@Inject(DOCUMENT) private document: any) { }

    get products(): string[] {
        return this.productList
    }
    
    changeStyle (event) {
        alert(document.getElementById("theme_css").getAttribute("href"));
        event.preventDefault();
    }
}