import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../model/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private endpoint = '/vehicle';

  constructor(private http: HttpClient) {}

  newVehicle(vehicle: Vehicle) {
    return this.http.post(`${this.endpoint}`, vehicle);
  }

  updateVehicle(vehicle: Vehicle) {
    let id = vehicle.cod.substr(4);

    console.log(id);

    return this.http.put(`${this.endpoint}/${id}`, vehicle);
  }

  getVehicle(cod: string) {
    return this.http.get(`${this.endpoint}/${cod}`);
  }

  getVehicles() {
    return this.http.get(`${this.endpoint}`);
  }
}
