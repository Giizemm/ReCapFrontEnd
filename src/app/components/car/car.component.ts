import { CarDetail } from './../../models/car-detail';
import { CarService } from './../../services/car.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  curretCar: Car;
  carsWithDetails: CarDetail[] = [];
  backendUrl: string = 'https://localhost:44392/';
  filterText: string = '';
  constructor(
    private carService: CarService,
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId'] && params['brandId']) {
        this.getCarsByColorAndBrandId(params['colorId'], params['brandId']);
      } else if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      } else {
        this.getCarsWithDetail();
      }
    });
  }

  getCarsWithDetail() {
    this.carService.getCarsWithDetail().subscribe((response) => {
      this.carsWithDetails = response.data;
    });
  }

  setCurrentCar(car: Car) {
    this.curretCar = car;
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.carsWithDetails = response.data;
    });
  }
  getCarsByColorAndBrandId(colorId: number, brandId: number) {
    this.carService
      .getCarsByColorAndBrandId(colorId, brandId)
      .subscribe((response) => (this.carsWithDetails = response.data));

  }
  getCarsByColorId(colorId: number) {
    this.carService
      .getCarsByColorId(colorId)
      .subscribe((response) => (this.carsWithDetails = response.data));
  }
  getImageByCar(id: number) {
    this.carDetailService.getImageByCar(id).subscribe((response) => {
      this.carsWithDetails = response.data;
    });
  }
  getImageUrl(url: string): string {
    return this.backendUrl + url;
  }
}
