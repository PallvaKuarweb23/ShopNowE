import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-kids-product',
  templateUrl: './kids-product.component.html',
  styleUrls: ['./kids-product.component.css'],
})
export class KidsProductComponent implements OnInit {
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
    'Pink',
  ];
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.http
      .get<any>(`https://shopnow-z6e3.onrender.com/kid/kids`)
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
  onBrandChange(brand: string) {
    this.productName = brand;
    this.http
      .get<any>(`https://shopnow-z6e3.onrender.com/kid/kids?brand=${brand}`)
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
      .get<any>(`https://shopnow-z6e3.onrender.com/kid/kids?color=${color}`)
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
  lHPrice() {
    this.http
      .get<any>(
        `https://shopnow-z6e3.onrender.com/kid/kids?sort=price&order=asc`
      )
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
  HlPrice() {
    this.http
      .get<any>(
        `https://shopnow-z6e3.onrender.com/kid/kids?sort=price&order=desc`
      )
      .subscribe((data) => {
        console.log(data);
        this.MensProduct = data;
      });
  }
}
