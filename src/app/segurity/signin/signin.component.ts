import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinContent: FormGroup;
  submit = false;
  showPassword = false;

  constructor(private signService: SigninService, private router: Router) {}

  ngOnInit(): void {
    this.signinContent = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      bank: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      tlf: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      dni: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  resetForm(): void {
    this.submit = false;
    this.signinContent.reset();
  }
  // envía el formulario
  submitForm() {
    // notificación de cargando para evitar mas acciones
    Swal.fire({
      title: 'Wait',
      text: 'Signing In',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    // llamo al servicio para enviar los datos del formulario
    this.signService
      .signin(
        this.signinContent.controls.username.value,
        this.signinContent.controls.password.value,
        this.signinContent.controls.name.value,
        this.signinContent.controls.surname.value,
        this.signinContent.controls.bank.value,
        this.signinContent.controls.address.value,
        this.signinContent.controls.tlf.value,
        this.signinContent.controls.dni.value
      )
      // me suscribo a la respuesta
      .subscribe(
        // si no es erronea notifico
        (res: any) => {
          Swal.fire({
            title: res.username,
            text: 'Signed In',
            icon: 'success',
          });
          this.submit = true;
          this.resetForm();
          this.router.navigate(['/login']);
        },
        // si es erronea notifico el error
        (error) => {
          Swal.fire({
            title: `${error.error.error}`,
            text: 'ERROR',
            icon: 'error',
          });
        }
      );
  }
}
