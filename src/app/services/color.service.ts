import { CarDetail } from './../models/car-detail';
import { ListResponseModel } from './../models/listResponseModel';
import { Color } from './../models/color';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44392/api/';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath=this.apiUrl+"colors/getAll";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);

  }




}
