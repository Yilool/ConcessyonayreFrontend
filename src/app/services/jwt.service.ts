import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  /**
   * Permite guardar el jwt (token) recibido.
   */
  almacenaJWT(token: string) {
    // Guardo el JWT recibido del servidor, el usuario y rol del jwt, en el almacenamiento local
    localStorage.setItem('jwt', token);
  }

  /**
   * Recupera el token (jwt).
   */
  recuperaJWT(): string {
    return localStorage.getItem('jwt');
  }

  /**
   * Elimina el token (jwt) almacenado.
   */
  eliminaJWT() {
    localStorage.removeItem('jwt');
  }
}
