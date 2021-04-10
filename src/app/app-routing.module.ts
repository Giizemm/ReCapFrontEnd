import { RentACarComponent } from './components/rent-a-car/rent-a-car.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorTableComponent } from './components/color-table/color-table.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandTableComponent } from './components/brand-table/brand-table.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/filter/:colorId/:brandId', component: CarComponent },
  { path: 'cars/getCarByImageId/:id', component: CarDetailComponent },
  { path: 'cars/customer', component: CustomerComponent },
  { path: 'cars/brand', component: BrandTableComponent },
  { path: 'cars/color', component: ColorTableComponent },
  { path: 'cars/rental', component: RentalComponent },
  { path: 'rentals/:carId', component: RentACarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
