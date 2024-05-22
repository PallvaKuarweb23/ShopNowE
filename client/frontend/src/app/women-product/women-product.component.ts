import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-women-product',
  templateUrl: './women-product.component.html',
  styleUrls: ['./women-product.component.css'],
})
export class WomenProductComponent implements OnInit {
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
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.http
      .get<any>(`https://shopnow-z6e3.onrender.com/women/womens`)
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
  onBrandChange(brand: string) {
    this.productName = brand;
    this.http
      .get<any>(`https://shopnow-z6e3.onrender.com/women/womens?brand=${brand}`)
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
      .get<any>(`https://shopnow-z6e3.onrender.com/women/womens?color=${color}`)
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
  lHPrice() {
    this.http
      .get<any>(
        `https://shopnow-z6e3.onrender.com/women/womens?sort=price&order=asc`
      )
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
  HlPrice() {
    this.http
      .get<any>(
        `https://shopnow-z6e3.onrender.com/women/womens?sort=price&order=desc`
      )
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
}
