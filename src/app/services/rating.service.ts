import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private endpoint = '/rating';

  constructor(private http: HttpClient) { }

  getCustomerVehicles(customer: number) {
    return this.http.get(`${this.endpoint}/${customer}`);
  }

  postRating(rating: number, comment: string, cus: number, veh: string) {
    var ratingDto = {
      rate: rating,
	    comment: comment,
	    customer: cus,
	    vehicle: veh,
    };

    return this.http.post(`${this.endpoint}`, ratingDto);
  }
}
