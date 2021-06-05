import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  getItem(key: string): any {
    return localStorage.getItem(key);
  }
  deleteItem(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}
