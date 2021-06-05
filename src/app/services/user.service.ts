import { ResponseModel } from './../models/responseModel';
import { User } from './../models/user';
import { SingleResponseModel } from './../models/singleResponseModel';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44392/api/';
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getall';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserById(id: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getUserById?id=' + id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  updateUser(user: User): Observable<SingleResponseModel<User>> {
    return this.httpClient.post<SingleResponseModel<User>>(
      this.apiUrl + 'users/update',
      user
      // {
      //   user: {
      //     id: user.id,
      //     firstName: user.firstName,
      //     lastName: user.lastName,
      //     email: user.email,
      //     status: user.status,
      //   },
      //   password: user.password,
      // }
    );
  }

  getFindex():Observable<number>{
    let newPath = this.apiUrl + 'users/calculateFindex';
    return this.httpClient.get<number>(newPath);
  }

}
