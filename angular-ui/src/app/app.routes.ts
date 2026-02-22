import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SimpleUsersWorkingComponent } from './components/users/simple-users-working.component';
import { SimpleProductsWorkingComponent } from './components/products/simple-products-working.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: SimpleUsersWorkingComponent },
  { path: 'products', component: SimpleProductsWorkingComponent },
  { path: '**', redirectTo: '' }
];
