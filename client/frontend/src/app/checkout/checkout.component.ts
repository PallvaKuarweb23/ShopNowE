import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalCost: number = 0;
  quantity: number = 0;
  constructor(private cartService: CartService, private order: OrderService) {}
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

          let cost = 0;

          data.forEach((item) => {
            cost = cost + item.price * item.quantity;
          });
          // console.log(price);

          this.totalCost = Math.floor(cost + cost / 10 + cost / 10 + 100);
          console.log(cost);
          this.quantity = data.length;
          console.log(this.quantity);
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
  orderNow(data: any) {
    console.log(data);
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.user._id;

      let orderData = {
        ...data,
        totalPrice: this.totalCost,
        userId: userId,
      };
      if (this.totalCost > 100) {
        this.order.order(orderData);
      } else {
        console.log("can't place order");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Can not place order!',
        });
      }
    }
  }
}
