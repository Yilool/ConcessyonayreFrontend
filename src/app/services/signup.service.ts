import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  signup(username: string, password: string, rol: string) {
    localStorage.clear();

    var signupUser = {
      username: username,
      password: password,
      roles: rol,
    };

    return this.http.post('/user/signup', signupUser);
  }
}
