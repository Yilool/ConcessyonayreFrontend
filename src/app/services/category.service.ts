import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private endpoint = '/category';

  constructor(private http: HttpClient) {}

  newCategory(category: Category) {
    return this.http.post(`${this.endpoint}`, category);
  }

  deleteCategory(code: string) {
    return this.http.delete(`${this.endpoint}/${code}`);
  }

  getCategories() {
    return this.http.get(`${this.endpoint}`);
  }
}
