import { Customer } from './../models/customer';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl= 'https://localhost:44392/api/customers/getAll';
  constructor(private httpClient: HttpClient) {}

  getCustomers():Observable<ListResponseModel<Customer>>
  {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }
}
