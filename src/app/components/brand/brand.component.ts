import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/model/brand';
import { BrandService } from 'src/app/services/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brandContent: FormGroup;
  submit = false;
  showPassword = false;

  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit(): void {
    this.brandContent = new FormGroup({
      brandName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  resetForm(): void {
    this.submit = false;
    this.brandContent.reset();
  }

  postBrand() {
    Swal.fire({
      title: 'Wait',
      text: 'Creating brand',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.brandService
      .newBrand(this.brandContent.controls.brandName.value)
      .subscribe((res: Brand) => {
        Swal.fire({
          title: `${res.brandName}`,
          text: 'Created',
          icon: 'success',
        }).then((res) => {
          if (res.value) {
            this.router.navigate(['/vehicles/brands']);
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
