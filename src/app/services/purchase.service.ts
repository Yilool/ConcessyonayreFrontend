import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private endpoint = '/purchase';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(`${this.endpoint}`);
  }

  newPurchase(vehicle: string, customer: string, enrollment: string, promo: string, financing: boolean = false) {
    var purchaseDto = {
      vehicle: vehicle,
	    customer: customer,
	    enrollment: enrollment,
	    promotion: promo,
	    financing: financing,
    };

    return this.http.post(`${this.endpoint}`, purchaseDto);
  }
}
