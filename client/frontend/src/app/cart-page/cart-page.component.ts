import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var Razorpay: any;
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: any[] = [];

  priceSummary: any = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.user._id;

      this.cartService.getCartItemsByUserId(userId).subscribe(
        (data) => {
          // console.log(data);
          this.cartData = data;
          let price = 0;
          let cost = 0;
          data.forEach((item) => {
            cost = cost + item.price * item.quantity;
          });
          // console.log(price);
          this.priceSummary.price = cost;
          this.priceSummary.discount = cost / 10;
          this.priceSummary.tax = cost / 10;
          this.priceSummary.delivery = 100;
          this.priceSummary.total = Math.floor(
            cost + cost / 10 + cost / 10 + 100
          );
          console.log(this.priceSummary);
        },
        (error) => {
          console.error(error);
          // Handle error, e.g., show an error message
        }
      );
    } else {
      console.log('user not exist');
    }
  }
  RemoveToCart(product: any) {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // console.log(userData.user.firstname);
      const userId = userData.user._id;

      this.cartService
        .removeFromCart(userId, product.productId)
        .subscribe((result) => {
          console.log(result);

          Swal.fire({
            icon: 'success',
            title: 'Product Removed from the Cart',

            showConfirmButton: true,
            confirmButtonText: 'Continue', // Customize the confirm button text
          });
          this.cartData = this.cartData.filter(
            (item) => item.productId !== product.productId
          );
          let price = 0;
          let cost = 0;
          this.cartData.forEach((item) => {
            price = price + item.price;
            cost = cost + item.price * item.quantity;
          });
          this.priceSummary.price = cost;
          this.priceSummary.discount = price / 10;
          this.priceSummary.tax = price / 10;
          this.priceSummary.delivery = 100;
          this.priceSummary.total = Math.floor(
            cost + price / 10 + price / 10 + 100
          );
          console.log(this.priceSummary);
        });

      // this.removeCart = false;
    } else {
      console.log('user not exist');
    }
  }

  checkoutRedirect() {
    if (this.priceSummary.total > 100) {
      this.router.navigate(['checkout']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Add product first!',
      });
    }
  }

  payNow(product: any) {
    console.log(product.productId);
    let productId = product.productId;
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.user._id;
      const name = userData.user.firstname;
      const email = userData.user.email;
      const RazorpayOptions = {
        description: 'Sample Rozarpay Demo',
        currency: 'INR',
        amount: product.price * 100,
        totalAmount: product.price,
        name: name,
        key: 'rzp_test_i4L39CW0ZKSiou',
        prefill: {
          name: name,
          email: email,
          phone: '8605268227',
        },
        theme: {
          color: '#6466e3',
        },
        modal: {
          ondismiss: () => {
            console.log('dismissed');
          },
        },
      };
      const successCallback = (paymentId: any) => {
        console.log(paymentId);
        console.log('hi');
        setTimeout(() => {
          const userDataString = localStorage.getItem('userData');
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            const userId = userData.user._id;
            this.cartService.removeFromCart(userId, productId).subscribe(
              (result) => {
                console.log('Product removed from the cart:', result);
                // Optionally, refresh the cart contents in your UI
                this.getCartContents();
              },
              (error) => {
                console.error('Error removing product from the cart:', error);
              }
            );
          } else {
            console.log('user does not exist');
          }
        }, 6000);
      };
      const failureCallback = (e: any) => {
        console.log(e);
        // console.log(e);
      };

      Razorpay.open(RazorpayOptions, successCallback, failureCallback);

      setTimeout(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const userId = userData.user._id;
          this.cartService.removeFromCart(userId, productId).subscribe(
            (result) => {
              console.log('Product removed from the cart:', result);
              // Optionally, refresh the cart contents in your UI
              this.getCartContents();
            },
            (error) => {
              console.error('Error removing product from the cart:', error);
            }
          );
        } else {
          console.log('user does not exist');
        }
      }, 6000);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please login first',
        showConfirmButton: true,
        confirmButtonText: 'Continue', // Customize the confirm button text
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login']);
          // Handle the user's confirmation (e.g., navigate to a new page or perform other actions)
        }
      });
    }
  }
  getCartContents() {
    const userDataString = localStorage.getItem('userData');
    // alert('hi');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // console.log(userData.user.firstname);
      const userId = userData.user._id;
      // Implement a method to retrieve the updated cart contents from your service
      this.cartService.getCartItemsByUserId(userId).subscribe(
        (data) => {
          // Update the UI with the new cart contents
          this.cartData = data;
          // console.log(data);

          let price = 0;
          let cost = 0;
          this.cartData.forEach((item) => {
            price = price + item.price;
            cost = cost + item.price * item.quantity;
          });
          this.priceSummary.price = cost;
          this.priceSummary.discount = price / 10;
          this.priceSummary.tax = price / 10;
          this.priceSummary.delivery = 100;
          this.priceSummary.total = Math.floor(
            cost + price / 10 + price / 10 + 100
          );
          console.log(this.priceSummary);
        },
        (error) => {
          console.error('Error retrieving cart contents:', error);
        }
      );
    }
  }
}
