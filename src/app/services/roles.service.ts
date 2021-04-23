import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private endpoint = '/roles';

  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get(`${this.endpoint}`);
  }

}
