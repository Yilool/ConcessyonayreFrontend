import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { RolesService } from 'src/app/services/roles.service';
import { SignupService } from 'src/app/services/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  rol: string[] = [];
  signupContent: FormGroup;
  submit = false;
  showPassword = false;

  
  constructor(
    private rolesService: RolesService,
    private signupService: SignupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe((res: string[]) => {
      this.rol = res;
    },
    (error) => {
      Swal.fire({
        title: `${error.error.message}`,
        text: 'ERROR',
        icon: 'error',
      });
    });

    this.signupContent = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
      roles: new FormControl(''),
    });
  }

  resetForm(): void {
    this.submit = false;
    this.signupContent.reset();
  }

  postUser() {
    Swal.fire({
      title: 'Wait',
      text: 'Signing Up',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.signupService
      .signup(
        this.signupContent.controls.username.value,
        this.signupContent.controls.password.value,
        this.signupContent.controls.roles.value
      )
      .subscribe((res: User) => {
        Swal.fire({
          title: `${res.username} || ${this.signupContent.controls.roles.value}`,
          text: 'Signed Up',
          icon: 'success',
        }).then((res) => {
          if (res.value) {
            this.router.navigate(['/users']);
            this.ngOnInit;
          }
        });
      },
      (error) => {
        Swal.fire({
          title: `${error.error.message}`,
          text: 'ERROR',
          icon: 'error',
        });
      });
  }
}
