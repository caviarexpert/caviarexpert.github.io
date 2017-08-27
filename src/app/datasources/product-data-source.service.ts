import { Injectable } from '@angular/core';
import { Product } from '../store/model/product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Injectable()
export class ProductDataSourceService {

    private products: Product[] = [
      new Product('salmon_cav_200g', 22.85, ['/assets/images/chase.jpg'], 0.2, 'kg', 'net_weight'),
      new Product('salmon_keta_cav_200g', 23.00, ['/assets/images/chase.jpg'], 0.2, 'kg', 'net_weight')
    ];

    constructor() { }
    getProducts(): Observable<Product[]> {
        return Observable.from( [this.products] );
    }

}

