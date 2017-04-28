import { TestBed, inject } from '@angular/core/testing';

import { ProductDataSourceService } from './product-data-source.service';

describe('ProductDataSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDataSourceService]
    });
  });

  it('should ...', inject([ProductDataSourceService], (service: ProductDataSourceService) => {
    expect(service).toBeTruthy();
  }));
});
