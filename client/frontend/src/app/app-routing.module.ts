import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { SerchedProductsComponent } from './serched-products/serched-products.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { WomenProductComponent } from './women-product/women-product.component';
import { KidsProductComponent } from './kids-product/kids-product.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/register', component: RegisterComponent },
  { path: 'register/login/register', component: RegisterComponent },
  { path: 'register/login', component: LoginComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'womenproduct', component: WomenProductComponent },
  { path: 'kidsproduct', component: KidsProductComponent },
  { path: 'search/:query', component: SerchedProductsComponent },
  { path: 'details/:category/:productId', component: ViewDetailsComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'myOrder', component: MyOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
