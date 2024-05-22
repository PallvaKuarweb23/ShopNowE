import { Component, OnInit } from '@angular/core';
import { MensProductService } from '../services/mens-product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  minPrice: number = 0;
  maxPrice: number = 1000; // Set an initial maximum price
  productName: string = 'Product';
  MensProduct: any[] = [];
  colors: string[] = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Black',
    'White',
    'Grey',
    'Brown',
  ];
  constructor(
    private mensProduct: MensProductService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.http
      .get<any>(`https://shopnow-z6e3.onrender.com/mens/mens`)
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
  onBrandChange(brand: string) {
    this.productName = brand;
    this.http
      .get<any>(`https://shopnow-z6e3.onrender.com/mens/mens?brand=${brand}`)
      .subscribe(
        (data) => {
          console.log(data);
          this.MensProduct = data;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  filterByColor(color: string) {
    // console.log(color);
    this.http
      .get<any>(`https://shopnow-z6e3.onrender.com/mens/mens?color=${color}`)
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
  lHPrice() {
    this.http
      .get<any>(
        `https://shopnow-z6e3.onrender.com/mens/mens?sort=price&order=asc`
      )
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
  HlPrice() {
    this.http
      .get<any>(
        `https://shopnow-z6e3.onrender.com/mens/mens?sort=price&order=desc`
      )
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
  onFilterChange() {}
  onBrandFilterChange() {}
  onPriceFilterChange() {
    // Filter your products based on the selected price range
    this.MensProduct = this.MensProduct.filter((product) => {
      const productPrice = product.price; // Replace with your product price field
      return productPrice >= this.minPrice && productPrice <= this.maxPrice;
    });
  }
}
