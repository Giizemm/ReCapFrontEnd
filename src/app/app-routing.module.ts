import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarTableComponent } from './components/car-table/car-table.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { RentACarComponent } from './components/rent-a-car/rent-a-car.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorTableComponent } from './components/color-table/color-table.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandTableComponent } from './components/brand-table/brand-table.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars-list', component: CarTableComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/filter/:colorId/:brandId', component: CarComponent },
  {
    path: 'cars/getCarByImageId/:id',
    component: CarDetailComponent,
  },
  { path: 'cars/customer', component: CustomerComponent },
  { path: 'cars/brand', component: BrandTableComponent },
  { path: 'cars/color', component: ColorTableComponent },
  { path: 'cars/rental', component: RentalComponent },
  { path: 'rentals/:carId', component: RentACarComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'colors/add', component: ColorAddComponent },
  {
    path: 'users/info',
    component: UserProfileComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cars/add', component: CarAddComponent, canActivate: [LoginGuard] },
  { path: 'brands/update/:brandId', component: BrandEditComponent },
  { path: 'colors/update/:colorId', component: ColorEditComponent },
  { path: 'cars/update/:carId', component: CarEditComponent },
  { path: 'users/add', component: RegisterComponent },
  {
    path: 'login',
    pathMatch: 'full',
    runGuardsAndResolvers: 'always',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
