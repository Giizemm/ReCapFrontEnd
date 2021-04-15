import { CarDetailService } from './../../services/car-detail.service';
import { Car } from './../../models/car';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/car-detail';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.css'],
})
export class CarTableComponent implements OnInit {
  filterText = '';
  carsWithDetails: CarDetail[] = [];
  backendUrl: string = 'https://localhost:44392/';
  constructor(
    private carService: CarService,
    private carDetailService: CarDetailService
  ) {}

  ngOnInit(): void {
    this.getCarsWithDetail();
  }

  getCarsWithDetail() {
    this.carService.getCarsWithDetail().subscribe((response) => {
      this.carsWithDetails = response.data;
    });
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
