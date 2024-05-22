// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, map, switchMap } from 'rxjs/operators';
// import { throwError, of, Observable } from 'rxjs';

// declare var Razorpay: any;

// @Injectable({
//   providedIn: 'root',
// })
// export class RazarpayService {
//   private rzp: any;

//   constructor(private http: HttpClient) {
//     this.waitForRazorpayAndInitiate();
//   }

//   waitForRazorpayAndInitiate() {
//     const interval = setInterval(() => {
//       if ((window as any).Razorpay) {
//         clearInterval(interval);
//         this.initiateRazorpay();
//       }
//     }, 100);
//   }

//   waitForInitialization(): Observable<boolean> {
//     return new Observable<boolean>((observer) => {
//       const interval = setInterval(() => {
//         if (this.rzp) {
//           clearInterval(interval);
//           observer.next(true); // Razorpay has been initialized
//           observer.complete();
//         }
//       }, 100);

//       // If Razorpay initialization fails after some time, emit 'false'
//       setTimeout(() => {
//         clearInterval(interval);
//         observer.next(false); // Razorpay initialization failed
//         observer.complete();
//       }, 10000); // Adjust the timeout as needed
//     });
//   }

//   initiateRazorpay() {
//     // Initialize the Razorpay instance with your Razorpay key
//     this.rzp = new (window as any).Razorpay({
//       key: 'JzVbVEEfQUj2tJ9EyI4xg6mI', // Replace with your Razorpay key
//     });
//   }

//   initiatePayment(amount: number): Observable<any> {
//     if (!this.rzp) {
//       // If this.rzp is not initialized, return an empty observable
//       return of(null);
//     }

//     return this.http
//       .post('http://localhost:3000/payment/makepayment', { amount })
//       .pipe(
//         switchMap((response: any) => {
//           if (response && response.payment_data) {
//             const orderData = response.payment_data;
//             const options = {
//               amount: orderData.amount,
//               order_id: orderData.id,
//               name: 'ShopNow',
//               description: 'Payment for Products',
//               image: 'path-to-your-logo.png',
//               handler: (response: any) => {
//                 console.log(response);
//                 if (response.isError) {
//                   return alert('Payment not done');
//                 }
//                 alert('Payment successful');
//                 // Handle the response here (e.g., mark the order as paid on your server)
//               },
//               prefill: {
//                 name: 'User Name',
//                 email: 'user@example.com',
//               },
//               notes: {
//                 address: 'User Address',
//               },
//             };

//             this.rzp.open(options);
//             return of(response); // Return the original response
//           } else {
//             console.error('Invalid response from backend');
//             return throwError('Invalid response');
//           }
//         }),
//         catchError((error) => {
//           console.error('Error initiating payment:', error);
//           return throwError(error);
//         })
//       );
//   }
// }
