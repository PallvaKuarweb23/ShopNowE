import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoginserviceService {
  constructor(private http: HttpClient, private router: Router) {}
  // for login
  login(data: any) {
    this.http
      .post('https://shopnow-z6e3.onrender.com/user/login', data, {
        observe: 'response',
      })
      .subscribe(
        (result) => {
          let userData = result.body;

          if (result.status == 200) {
            // After successful registration
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'You have successfully logged in an account.',
              showConfirmButton: true,
              confirmButtonText: 'Continue', // Customize the confirm button text
            }).then((result) => {
              if (result.isConfirmed) {
                // const userData=result.user
                this.router.navigate(['product']);
                localStorage.setItem('userData', JSON.stringify(userData));
                // Handle the user's confirmation (e.g., navigate to a new page or perform other actions)
              }
            });
          } else if (result.status == 201) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Register First',
              showConfirmButton: true,
              confirmButtonText: 'Continue', // Customize the confirm button text
            }).then((result) => {
              if (result.isConfirmed) {
                // Handle the user's confirmation (e.g., navigate to a new page or perform other actions)
                this.router.navigate(['register/login/register']);
              }
            });
          } else if (result.status == 202) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Invalid Password',
              showConfirmButton: true,
              confirmButtonText: 'Continue', // Customize the confirm button text
            }).then((result) => {
              if (result.isConfirmed) {
                // Handle the user's confirmation (e.g., navigate to a new page or perform other actions)
              }
            });
          }
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
  }
  //for register
  register(data: any) {
    this.http
      .post(`https://shopnow-z6e3.onrender.com/user/register`, data, {
        observe: 'response',
      })
      .subscribe(
        (result) => {
          // console.log(result);
          if (result.status == 200) {
            // After successful registration
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'You have successfully registered an account.',
              showConfirmButton: true,
              confirmButtonText: 'Continue', // Customize the confirm button text
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['register/login']);
                // Handle the user's confirmation (e.g., navigate to a new page or perform other actions)
              }
            });
          } else if (result.status == 201) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'User already registered with this account',
              showConfirmButton: true,
              confirmButtonText: 'Continue', // Customize the confirm button text
            }).then((result) => {
              if (result.isConfirmed) {
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
}
