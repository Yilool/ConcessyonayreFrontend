import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private endpoint = '/model';

  constructor(private http: HttpClient) {}

  newModel(modelDto: Model) {
    return this.http.post(`${this.endpoint}`, modelDto);
  }

  deleteModel(code: string) {
    return this.http.delete(`${this.endpoint}/${code}`);
  }

  getModels() {
    return this.http.get(`${this.endpoint}`);
  }
}
