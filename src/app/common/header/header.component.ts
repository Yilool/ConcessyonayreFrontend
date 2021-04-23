import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  admin: boolean = false;
  mechanic: boolean = false;
  hirer: boolean = false;
  seller: boolean = false;
  customer: boolean = false;

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.logged = this.loginService.isLogged('');
    this.admin = this.loginService.isAdmin('');
    this.mechanic = this.loginService.isMechanic('');
    this.hirer = this.loginService.isHirer('');
    this.seller = this.loginService.isSeller('');
    this.customer = this.loginService.isCustomer('');

    this.loginService.changeLoginStatus$.subscribe((logged: boolean) => {
      this.logged = logged;
    })

    this.loginService.changeAdminStatus$.subscribe((admin: boolean) => {
      this.admin = admin;
    })

    this.loginService.changeMechanicStatus$.subscribe((mechanic: boolean) => {
      this.mechanic = mechanic;
    })

    this.loginService.changeHirerStatus$.subscribe((hirer: boolean) => {
      this.hirer = hirer;
    })

    this.loginService.changeSellerStatus$.subscribe((seller: boolean) => {
      this.seller = seller;
    })

    this.loginService.changeCustomStatus$.subscribe((customer: boolean) => {
      this.customer = customer;
    })
  }

  logout() {
    this.loginService.logout();
  }
}
