import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brands } from '../model/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private endpoint = '/brand';

  constructor(private http: HttpClient) {}

  newBrand(brand: Brands) {
    return this.http.post(`${this.endpoint}`, brand);
  }
  
    deleteBrand(code: string) {
      return this.http.delete(`${this.endpoint}/${code}`);
    }
  
  getBrands() {
    return this.http.get(`${this.endpoint}`);
  }
}
