import { CarDetailService } from './car-detail.service';
import { SingleResponseModel } from './../models/singleResponseModel';
import { CreditCard } from './../models/creditCard';
import { ResponseModel } from './../models/responseModel';
import { Rental } from './../models/rental';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44392/api/';
  constructor(
    private httpClient: HttpClient,
    private carDetailService: CarDetailService
  ) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getAllWithDetails';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getCarByRentalCarId(carId: number): Observable<SingleResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getCarByRentalCarId?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }

  addRental(
    rental: Partial<Rental>,
    creditCard: CreditCard
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'rentals/add', {
      rental: {
        carId: rental.carId,
        customerId: rental.customerId,
        rentDate: rental.rentDate,
        returnDate: rental.returnDate,
      },
      creditCard: creditCard,
    });
  }

  checkCanRental(
    carId: number,
    rentDate: Date,
    returnDate: Date
  ): Observable<SingleResponseModel<Rental>> {
    let newPath =
      this.apiUrl +
      `rentals/checkCanRental?carId=${carId}&rentDate=${rentDate}&returnDate=${returnDate}`;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }
}
