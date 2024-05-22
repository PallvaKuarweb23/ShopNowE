import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  addToCart(product: any) {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.user._id;
      return this.http
        .post(`https://shopnow-z6e3.onrender.com/cart/add-to-cart`, product)
        .pipe(
          map((response: any) => {
            this.updateCartItemCount(userId); // Update count after addition
            return response;
          })
        );
    } else {
      return this.http.post(
        `https://shopnow-z6e3.onrender.com/cart/add-to-cart`,
        product
      );
    }
  }

  getCartItemsByUserId(userId: string) {
    return this.http.get<any[]>(
      `https://shopnow-z6e3.onrender.com/cart/${userId}`
    );
  }

  public updateCartItemCount(userId: string) {
    this.getCartItemsByUserId(userId).subscribe((cartItems) => {
      const itemCount = cartItems.length;
      this.cartItemCountSubject.next(itemCount);
    });
  }

  removeFromCart(userId: string, productId: string) {
    const url = `https://shopnow-z6e3.onrender.com/cart/${userId}/${productId}`;

    return this.http.delete(url).pipe(
      map((response: any) => {
        // Update the count after removal
        this.updateCartItemCount(userId);
        return response;
      })
    );
  }

  checkProductInCart(userId: string, productId: string) {
    const url = `https://shopnow-z6e3.onrender.com/cart/${userId}/${productId}`;

    return this.http.get<boolean>(url); // The API should return a boolean indicating presence
  }
  order(data: any) {
    let userId = data.userId;
    this.http
      .post('https://shopnow-z6e3.onrender.com/order/', data, {
        observe: 'response',
      })
      .subscribe(
        (result) => {
          // console.log(result);
          if (result.status == 200) {
            // After successful registration
            Swal.fire({
              icon: 'success',
              title: 'Order Placed',

              showConfirmButton: true,
              confirmButtonText: 'Continue', // Customize the confirm button text
            }).then((result) => {
              if (result.isConfirmed) {
                this.removeFromCartAll(userId);
                this.router.navigate(['cart-page']);
                // Handle the user's confirmation (e.g., navigate to a new page or perform other actions)
              }
            });
          }
        },
        (error) => {
          console.error('An error occurred:', error.error.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
  }

  removeFromCartAll(userId: string) {
    const url = `https://shopnow-z6e3.onrender.com/cart/${userId}`;

    return this.http.delete(url).pipe(
      map((response: any) => {
        // Update the count after removal
        console.log(response);
        this.updateCartItemCount(userId);
        return response;
      })
    );
  }
}
