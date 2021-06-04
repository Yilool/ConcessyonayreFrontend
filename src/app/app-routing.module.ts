import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HomeComponent } from './components/home/home.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { RatingComponent } from './components/rating/rating.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsCustomerGuard } from './guards/is-customer.guard';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { IsSellerGuard } from './guards/is-seller.guard';
import { LoginComponent } from './segurity/login/login.component';
import { SigninComponent } from './segurity/signin/signin.component';
import { SignupComponent } from './segurity/signup/signup.component';
import { UsersComponent } from './segurity/users/users.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsLoggedGuard, IsAdminGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [IsLoggedGuard, IsAdminGuard],
  },
  {
    path: 'promo',
    component: PromotionComponent,
    canActivate: [IsLoggedGuard, IsAdminGuard],
  },
  {
    path: 'promos',
    component: PromotionsComponent,
    canActivate: [IsLoggedGuard, IsAdminGuard],
  },
  {
    path: 'purchase',
    component: PurchaseComponent,
    canActivate: [IsLoggedGuard, IsSellerGuard],
  },
  {
    path: 'rating/:cod',
    component: RatingComponent,
    canActivate: [IsLoggedGuard, IsCustomerGuard],
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./module/vehicle/vehicle.module').then((m) => m.VehicleModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
