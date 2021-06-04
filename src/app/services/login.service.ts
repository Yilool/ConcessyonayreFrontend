import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JwtService } from './jwt.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly ISLOGGED = 'islogged';
  readonly ISADMIN = 'isadmin';
  readonly ISMECHANIC = 'ismechanic';
  readonly ISHIRER = 'ishirer';
  readonly ISSELLER = 'isseller';
  readonly ISCUSTOM = 'iscustom';

  public loginAccessUrl = '';
  public adminAccessUrl = '';
  public mechanicAccessUrl = '';
  public hirerAccessUrl = '';
  public sellerAccessUrl = '';
  public customAccessUrl = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  public changeAdminStatusSubject = new Subject<boolean>();
  public changeAdminStatus$ = this.changeAdminStatusSubject.asObservable();

  public changeMechanicStatusSubject = new Subject<boolean>();
  public changeMechanicStatus$ =
    this.changeMechanicStatusSubject.asObservable();

  public changeHirerStatusSubject = new Subject<boolean>();
  public changeHirerStatus$ = this.changeHirerStatusSubject.asObservable();

  public changeSellerStatusSubject = new Subject<boolean>();
  public changeSellerStatus$ = this.changeSellerStatusSubject.asObservable();

  public changeCustomStatusSubject = new Subject<boolean>();
  public changeCustomStatus$ = this.changeCustomStatusSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwt: JwtService
  ) {}

  login(username: string, password: string) {
    var logUser = {
      username: username,
      password: password,
    };

    // establezco que la respuesta de la peticion será de tipo texto
    this.http.post('/user/login', logUser, { responseType: 'text' }).subscribe(
      (response) => {
        if (response != null && response != undefined) {
          let rol;
          let jwtDecode: any = jwt_decode(response);

          rol = jwtDecode.roles[0];

          localStorage.setItem(this.ISLOGGED, 'true');
          this.changeLoginStatusSubject.next(true);

          this.jwt.almacenaJWT(response);
          localStorage.setItem('username', jwtDecode.username);

          switch (rol) {
            case 'ADMIN':
              localStorage.setItem(this.ISADMIN, 'true');
              this.changeAdminStatusSubject.next(true);
              break;
            case 'MECHANIC':
              localStorage.setItem(this.ISMECHANIC, 'true');
              this.changeMechanicStatusSubject.next(true);
              break;
            case 'HIRER':
              localStorage.setItem(this.ISHIRER, 'true');
              this.changeHirerStatusSubject.next(true);
              break;
            case 'SELLER':
              localStorage.setItem(this.ISSELLER, 'true');
              this.changeSellerStatusSubject.next(true);
              break;
            default:
              localStorage.setItem("cus", jwtDecode.cod)
              localStorage.setItem(this.ISCUSTOM, 'true');
              this.changeCustomStatusSubject.next(true);
              break;
          }

          Swal.fire({
            title: jwtDecode.username,
            text: 'Logged',
            icon: 'success',
          });

          this.router.navigate(['/home']);
        }
      },
      (error) => {
        Swal.fire({
          title: `${error.error.message}`,
          text: 'Exception',
          icon: 'error',
        });
      }
    );
  }

  logout() {
    // borra los datos del almacenamiento local
    localStorage.clear();
    this.changeLoginStatusSubject.next(false);
    this.changeAdminStatusSubject.next(false);
    this.changeMechanicStatusSubject.next(false);
    this.changeHirerStatusSubject.next(false);
    this.changeSellerStatusSubject.next(false);
    this.changeCustomStatusSubject.next(false);

    this.router.navigate(['/home']);
  }

  isLogged(url: string) {
    const isLogged = localStorage.getItem(this.ISLOGGED);

    if (!isLogged) {
      this.loginAccessUrl = url;

      return false;
    }

    return true;
  }

  isAdmin(url: string) {
    const isAdmin = localStorage.getItem(this.ISADMIN);

    if (!isAdmin) {
      this.adminAccessUrl = url;

      return false;
    }

    return true;
  }

  isMechanic(url: string) {
    const isMechanic = localStorage.getItem(this.ISMECHANIC);

    if (!isMechanic) {
      this.mechanicAccessUrl = url;

      return false;
    }

    return true;
  }

  isHirer(url: string) {
    const isHirer = localStorage.getItem(this.ISHIRER);

    if (!isHirer) {
      this.hirerAccessUrl = url;

      return false;
    }

    return true;
  }

  isSeller(url: string) {
    const isSeller = localStorage.getItem(this.ISSELLER);

    if (!isSeller) {
      this.sellerAccessUrl = url;

      return false;
    }

    return true;
  }

  isCustomer(url: string) {
    const isCustomer = localStorage.getItem(this.ISCUSTOM);

    if (!isCustomer) {
      this.customAccessUrl = url;

      return false;
    }

    return true;
  }
}
