import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  private endpoint = '/fuel';

  constructor(private http: HttpClient) {}

  getFuel() {
    return this.http.get(`${this.endpoint}`);
  }
}
