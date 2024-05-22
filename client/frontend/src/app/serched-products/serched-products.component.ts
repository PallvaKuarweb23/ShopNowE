import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensProductService } from '../services/mens-product.service';
import { WomensServicesService } from '../services/womens-services.service';

@Component({
  selector: 'app-serched-products',
  templateUrl: './serched-products.component.html',
  styleUrls: ['./serched-products.component.css'],
})
export class SerchedProductsComponent implements OnInit {
  searchResult: undefined | any[];

  constructor(
    private activeRoute: ActivatedRoute,
    private mensProduct: MensProductService,
    private womensProduct: WomensServicesService
  ) {}
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.log(query);
    query &&
      this.mensProduct.searchByBrand(query).subscribe((result: any) => {
        console.log(result);
        this.searchResult = result.reduce(
          (acc: any, val: any) => acc.concat(val),
          []
        );
        console.log(this.searchResult);
      });
  }
}
