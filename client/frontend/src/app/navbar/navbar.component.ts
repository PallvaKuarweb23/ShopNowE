import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { MensProductService } from '../services/mens-product.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showSearchForm: boolean = true;
  showCustomClass: boolean = true;
  searchProducts: undefined | any[] = [];
  cartItem: number = 0; // Use this property to display cart item count
  cartData: any[] = [];

  constructor(
    private router: Router,
    private MensProduct: MensProductService,
    private cartService: CartService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSearchForm = event.url !== '/';
        this.showCustomClass = false;
      }
    });
  }

  ngOnInit(): void {
    // Subscribe to the cartItemCount$ observable to keep cartItem updated
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItem = count;
    });

    this.getCartItem();
  }

  getUserData() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user = userData.user;
      return { name: user.firstname };
    } else {
      return { name: 'login/register' };
    }
  }

  isUserLoggedIn() {
    const userDataString = localStorage.getItem('userData');
    return userDataString !== null;
  }

  logout() {
    localStorage.removeItem('userData');
    this.cartItem = 0;
    this.router.navigate(['']);
  }

  searchProduct(event: Event): void {
    const element = event.target as HTMLInputElement;
    const brandName = element.value;

    if (brandName) {
      this.MensProduct.searchByBrand(brandName).subscribe((result) => {
        this.searchProducts = result.reduce(
          (acc: any, val: any) => acc.concat(val),
          []
        );
      });
    }
  }

  hideresults() {
    this.searchProducts = undefined;
  }

  submitSearch(val: string) {
    this.router.navigate([`search/${val}`]);
  }

  getCartItem() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.user._id;

      this.cartService.getCartItemsByUserId(userId).subscribe(
        (data) => {
          this.cartData = data;
          this.cartItem = this.cartData.length; // Update the cart item count here
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
  redirect() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.router.navigate(['cart-page']);
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
  orderSummary() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);

      this.router.navigate(['myOrder']);
    } else {
      console.log('first place the order');
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
}
