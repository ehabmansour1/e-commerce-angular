import { Routes } from '@angular/router';
import { ProductsContainerComponent } from './products-container/products-container.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsContainerComponent,
    title: 'Home',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
];
