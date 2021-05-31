import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModelsComponent } from 'src/app/components/models/models.component';
import { IsLoggedGuard } from 'src/app/guards/is-logged.guard';
import { IsMechanicGuard } from 'src/app/guards/is-mechanic.guard';
import { BrandsComponent } from 'src/app/components/brands/brands.component';
import { CategoriesComponent } from 'src/app/components/categories/categories.component';
import { ModelComponent } from 'src/app/components/model/model.component';
import { BrandComponent } from 'src/app/components/brand/brand.component';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { VehiclesComponent } from 'src/app/components/vehicles/vehicles.component';
import { VehicleComponent } from 'src/app/components/vehicle/vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    canActivate: [IsLoggedGuard, IsMechanicGuard],
  },
  {
    path: 'vehicle/:cod',
    component: VehicleComponent,
    canActivate: [IsLoggedGuard, IsMechanicGuard],
  },
  {
    path: 'models',
    component: ModelsComponent,
    canActivate: [IsLoggedGuard, IsMechanicGuard],
  },
  {
    path: 'model',
    component: ModelComponent,
    canActivate: [IsLoggedGuard, IsMechanicGuard],
  },
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [IsLoggedGuard, IsMechanicGuard],
  },
  {
    path: 'brand',
    component: BrandComponent,
    canActivate: [IsLoggedGuard, IsMechanicGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [IsLoggedGuard, IsMechanicGuard],
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [IsLoggedGuard, IsMechanicGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleModule {}
