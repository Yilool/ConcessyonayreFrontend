import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './segurity/login/login.component';
import { SigninComponent } from './segurity/signin/signin.component';
import { SignupComponent } from './segurity/signup/signup.component';
import { UsersComponent } from './segurity/users/users.component';
import { InterceptorService } from './services/interceptor.service';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsMechanicGuard } from './guards/is-mechanic.guard';
import { IsCustomerGuard } from './guards/is-customer.guard';
import { IsHirerGuard } from './guards/is-hirer.guard';
import { IsSellerGuard } from './guards/is-seller.guard';
import { HomeComponent } from './components/home/home.component';
import { ModelComponent } from './components/model/model.component';
import { BrandComponent } from './components/brand/brand.component';
import { CategoryComponent } from './components/category/category.component';
import { ModelsComponent } from './components/models/models.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { PurchaseComponent } from './components/purchase/purchase.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SigninComponent,
    SignupComponent,
    UsersComponent,
    HomeComponent,
    ModelComponent,
    BrandComponent,
    CategoryComponent,
    ModelsComponent,
    BrandsComponent,
    CategoriesComponent,
    VehicleComponent,
    VehiclesComponent,
    PromotionComponent,
    PromotionsComponent,
    PurchaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    DividerModule,
    ButtonModule,
    TableModule,
    DropdownModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    IsLoggedGuard,
    IsAdminGuard,
    IsMechanicGuard,
    IsCustomerGuard,
    IsHirerGuard,
    IsSellerGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
