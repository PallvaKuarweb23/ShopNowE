import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  data: any[] = [];
  count: number = 0;
  constructor(private order: OrderService, private router: Router) {}
  ngOnInit(): void {
    this.order.orderDetails().subscribe((result) => {
      this.data = result;
      console.log(result);
    });
  }
  cancelOrder(Id: string) {
    this.order.CancelOrder(Id).subscribe((result) => {
      console.log(result);
      Swal.fire({
        icon: 'success',
        title: 'Order Cancel',

        showConfirmButton: true,
        confirmButtonText: 'Continue', // Customize the confirm button text
      }).then((result) => {
        if (result.isConfirmed) {
          // this.router.navigate(['cart-page']);
          // Handle the user's confirmation (e.g., navigate to a new page or perform other actions)
        }
      });

      this.data = this.data.filter((order) => order._id !== Id);
    });
  }
}
