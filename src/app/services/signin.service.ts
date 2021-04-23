import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(private http: HttpClient) {}

  signin(
    username: string,
    password: string,
    name: string,
    surname: string,
    bank: string,
    address: string,
    tlf: string,
    dni: string
  ) {
    localStorage.clear();

    var signinUser = {
      username: username,
      password: password,
      name: name,
      surname: surname,
      bankaccount: bank,
      address: address,
      tlf: tlf,
      dni: dni,
    };

    return this.http.post('/user/signin', signinUser);
  }
}
