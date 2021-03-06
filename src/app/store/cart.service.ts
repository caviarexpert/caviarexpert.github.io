import { Injectable } from '@angular/core';
import { Product } from './model/product';
import { SessionService, SessionData } from '../shared/session.service';

@Injectable()
export class Cart {
    public lines: CartLine[] = [];
    // public itemCount: number = 0;
    // public cartPrice: number = 0;

    constructor(private sessionService: SessionService){
        this.sessionService.registerProvider( () => {
            const cartLines: any = this.lines.map ( cl => {
                const cartData: any = { sku: cl.product.sku, quantity: cl.quantity};
                return cartData;
             });
            return new SessionData('cart',  cartLines );
        });
    }

    addLine(product: Product, quantity: number = 1) {
        const line = this.lines.find( aline => aline.product.sku === product.sku);
        if (line !== undefined) {
            line.quantity += quantity;
        } else {
            this.lines.push(new CartLine(product, quantity));
        }
    }

    removeLine(sku: string) {
        const index = this.lines.findIndex(line => line.product.sku === sku);
        if (index >= 0) {
            this.lines.splice(index, 1);
        }
    }

    get totalCartPrice(): number{
        return this.lines
            .map ( line => line.quantity * line.product.price )
            .reduce ( (last, current) => last + current, 0);
    }

    clear() {
        this.lines = [];
        // this.itemCount = 0;
        // this.cartPrice = 0;
    }
}

export class CartLine {

    constructor(public product: Product,
        public quantity: number) { }

    get lineTotal(): number {
        return this.quantity * this.product.price;
    }
}
