import { UpdateCarModel } from './../models/update-car-model';
import { AddCarModel } from './../models/add-car-model';
import { ResponseModel } from './../models/responseModel';
import { CarDetail } from './../models/car-detail';
import { Car } from './../models/car';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44392/api/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getCarDetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getCarsByBrandId?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColorId(colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getCarsByColorId?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColorAndBrandId(
    colorId: number,
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath =
      this.apiUrl +
      `cars/getCarsByColorAndBrandId?colorId=${colorId}&brandId=${brandId}`;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsWithDetail(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getAllWithDetail';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarById(carId: number): Observable<SingleResponseModel<UpdateCarModel>> {
    let newPath = this.apiUrl + 'cars/getCarById?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<UpdateCarModel>>(newPath);
  }

  add(car: AddCarModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/add', car);
  }

  update(car: UpdateCarModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'cars/update',
      car
    );
  }
}
