import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { concatMap } from 'rxjs/operators';

// ... your code here ...

@Injectable({
  providedIn: 'root',
})
export class MensProductService {
  constructor(private http: HttpClient, private router: Router) {}

  searchByBrand(query: string): Observable<any[]> {
    // Perform searches for each collection
    const mensSearch = this.http.get<any>(
      `https://shopnow-z6e3.onrender.com/mens/mens/search?brand=${query}`
    );
    const womenSearch = this.http.get<any>(
      `https://shopnow-z6e3.onrender.com/women/womens/search?brand=${query}`
    );
    const kidSearch = this.http.get<any>(
      `https://shopnow-z6e3.onrender.com/kid/kids/search?brand=${query}`
    );

    // Use forkJoin to combine the results and return as an observable
    return forkJoin([mensSearch, womenSearch, kidSearch]).pipe(
      // Filter out empty arrays
      filter((results) => results.some((arr) => arr.length > 0))
    );
  }

  getProductById(productId: string) {
    return this.http.get<any>(
      `https://shopnow-z6e3.onrender.com/mens/mens/${productId}`
    );
  }
}
