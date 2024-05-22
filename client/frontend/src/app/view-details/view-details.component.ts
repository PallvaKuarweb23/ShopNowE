import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensProductService } from '../services/mens-product.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
import { WomensServicesService } from '../services/womens-services.service';
import { KidService } from '../services/kid.service';
// import { RazarpayService } from '../razarpay.service';
// import Razorpay from 'razorpay';

declare var Razorpay: any;
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css'],
})
export class ViewDetailsComponent implements OnInit {
  mensProduct: undefined | any;
  removeCart: Boolean = false;
  productQuantity: number = 1;
  constructor(
    private activeRoute: ActivatedRoute,
    private MensService: MensProductService,
    private WomensService: WomensServicesService,
    private KidsService: KidService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    let category = this.activeRoute.snapshot.paramMap.get('category');
    // console.log(productId);
    console.log(category);

    if (productId) {
      if (category === 'men') {
        // Fetch the product details
        this.MensService.getProductById(productId).subscribe((result) => {
          this.mensProduct = result;
        });
      } else if (category === 'women') {
        this.WomensService.getProductById(productId).subscribe((result) => {
          this.mensProduct = result;
        });
      } else if (category == 'kid') {
        this.KidsService.getProductById(productId).subscribe((result) => {
          this.mensProduct = result;
        });
      }

      // Check if the product is in the cart
      this.checkProductInCart(productId);
    }
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart(product: any) {
    // You can modify this to include more product details if needed
    const userData = localStorage.getItem('userData');
    // const userDetails = userData.user;
    console.log(userData);
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user.user._id; // Extract the user's ID
      console.log('hi', userId);
      this.cartService
        .checkProductInCart(userId, product._id)
        .subscribe((isPresent) => {
          if (isPresent) {
            // The product is already in the cart, handle accordingly (e.g., show a message)
            console.log('Product is already in the cart.');
            Swal.fire({
              icon: 'error',
              title: 'Product already exist in the Card',

              showConfirmButton: true,
              confirmButtonText: 'Continue', // Customize the confirm button text
            });
            // this.removeCart = true;
          } else {
            // The product is not in the cart, proceed to add it
            const cartItem = {
              productId: product._id,
              productImage: product.image,
              productName: product.brand,
              price: product.price,
              quantity: this.productQuantity,
              description: product.description,
              userId: userId, // Include the user's ID
            };
            console.log(cartItem);
            this.cartService.addToCart(cartItem).subscribe((result) => {
              console.log(result);
              this.cartService.updateCartItemCount(userId);
              Swal.fire({
                icon: 'success',
                title: 'Product Added to Cart',

                showConfirmButton: true,
                confirmButtonText: 'Continue', // Customize the confirm button text
              });
            });
            this.removeCart = true;
            this.getCartItem();
          }
        });
      // Now you have the user's ID and can add the product to the cart
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please login',
        text: 'Want to add Product to the card please login!',
        showConfirmButton: true,
        confirmButtonText: 'Continue', // Customize the confirm button text
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login']);
          // Handle the user's confirmation (e.g., navigate to a new page or perform other actions)
        }
      });
      // Handle the case where the user data is not in local storage
      // this.router.navigate(['login']);
    }
  }
  checkProductInCart(productId: string) {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.user._id;

      this.cartService
        .checkProductInCart(userId, productId)
        .subscribe((isPresent) => {
          // Set the 'isProductInCart' flag based on the response
          if (isPresent) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        });
    }
  }

  getCartItem() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // console.log(userData.user.firstname);
      const userId = userData.user._id;

      this.cartService.getCartItemsByUserId(userId);
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
      console.log('hi');
      this.cartService
        .removeFromCart(userId, product._id)
        .subscribe((result) => {
          console.log(result);
          Swal.fire({
            icon: 'success',
            title: 'Product Removed from the Cart',

            showConfirmButton: true,
            confirmButtonText: 'Continue', // Customize the confirm button text
          });
        });
      this.removeCart = false;
    } else {
      console.log('user not exist');
    }
  }

  payNow(product: any) {
    console.log(product._id);
    let productId = product._id;
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
      };
      const failureCallback = (e: any) => {
        console.log(e);
      };
      Razorpay.open(RazorpayOptions, successCallback, failureCallback);
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
}
