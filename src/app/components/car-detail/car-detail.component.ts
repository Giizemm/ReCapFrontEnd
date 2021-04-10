import { RentalService } from './../../services/rental.service';
import { RentACarComponent } from './../rent-a-car/rent-a-car.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarDetail } from '../../models/car-detail';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarDetailService } from '../../services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetail[] = [];
  imagePathList: string = '';
  backendUrl = 'https://localhost:44392/';
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private rentalService:RentalService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getImageByCar(params['id']);
      }
    });
  }

  getImageByCar(id: number) {
    this.carDetailService.getImageByCar(id).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  setClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  getImageUrl(url: string): string {
    return this.backendUrl + url;
  }

  addRental(dailyPrice: number, carId: number) {
    const ref = this.modalService.open(RentACarComponent, { centered: true });
    ref.componentInstance.dailyPrice = dailyPrice;
    ref.componentInstance.currentCarId = carId;
    ref.result.then(yes=>{
      console.log("Yes click");
    },
    (cancel)=>{
      console.log("Cancel click");
    })
  }


}
