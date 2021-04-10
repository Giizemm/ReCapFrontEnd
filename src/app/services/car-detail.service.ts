import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetail } from '../models/car-detail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = 'https://localhost:44392/api/';

  constructor(private httpClient:HttpClient) { }

  getImageByCar(id:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getCarByImageId?id=" + id;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
