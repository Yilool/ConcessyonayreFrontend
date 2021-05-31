import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private endpoint = '/promotion';

  constructor(private http: HttpClient) {}

  newPromotion(promo: string, discount: number) {
    var promoDto = {
      promoname: promo,
      discountPercent: discount,
    };

    return this.http.post(`${this.endpoint}`, promoDto);
  }

  deletePromotion(cod: string) {
    return this.http.delete(`${this.endpoint}/${cod}`);
  }

  getPromotions() {
    return this.http.get(`${this.endpoint}`);
  }
}
