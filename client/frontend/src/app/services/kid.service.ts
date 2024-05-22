import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class KidService {
  constructor(private http: HttpClient, private router: Router) {}

  serachProductservice(query: string) {
    return this.http.get<any>(
      `https://shopnow-z6e3.onrender.com/kid/kids/search?brand=${query}`
    );
  }
  getProductById(productId: string) {
    return this.http.get<any>(
      `https://shopnow-z6e3.onrender.com/kid/kids/${productId}`
    );
  }
}
