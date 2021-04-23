import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginContent: FormGroup;
  submit = false;
  showPassword = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginContent = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  resetForm(): void {
    this.submit = false;
    this.loginContent.reset();
  }

  submitForm() {
    // notificación de cargando para evitar mas acciones
    Swal.fire({
      title: 'Wait',
      text: 'Loging In',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    // llamo al servicio para enviar los datos del formulario
    this.loginService.login(
      this.loginContent.controls.username.value,
      this.loginContent.controls.password.value
    );

    this.resetForm;
  }
}
