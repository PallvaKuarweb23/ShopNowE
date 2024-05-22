import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router) {}

  shouldShowNavbar(): boolean {
    const currentRoute = this.router.url;
    // Conditionally return false to hide the navbar on the login and register routes
    return (
      currentRoute !== '/register/login' &&
      currentRoute !== '/register' &&
      currentRoute !== '/register/login/register' &&
      currentRoute !== '/login'
    );
  }
}
