import { SingleResponseModel } from './../models/singleResponseModel';
import { ResponseModel } from './../models/responseModel';
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
    let newPath = this.apiUrl + 'colors/getAll';
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getColorById(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath = this.apiUrl + 'colors/getColorById?id='+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

  add(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'colors/add',
      color
    );
  }

  update(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'colors/update',
      color
    );
  }
}
