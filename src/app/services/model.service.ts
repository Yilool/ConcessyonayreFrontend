import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private endpoint = '/model';

  constructor(private http: HttpClient) {}

  newModel(model: string, brand: string, category: string) {
    var modelDto = {
      modelName: model,
      brand: brand,
      category: category
    }

    return this.http.post(`${this.endpoint}`, modelDto);
  }

  deleteModel(code: string) {
    return this.http.delete(`${this.endpoint}/${code}`);
  }

  getModels() {
    return this.http.get(`${this.endpoint}`);
  }
}
