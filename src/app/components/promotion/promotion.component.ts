import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Promotion } from 'src/app/model/promotion';
import { PromotionService } from 'src/app/services/promotion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css'],
})
export class PromotionComponent implements OnInit {
  promoContent: FormGroup;
  submit = false;

  constructor(private promoService: PromotionService, private router: Router) {}

  ngOnInit(): void {
    this.promoContent = new FormGroup({
      promoName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      discount: new FormControl('', [Validators.required]),
    });
  }

  resetForm(): void {
    this.submit = false;
    this.promoContent.reset();
  }

  postPromotion() {
    Swal.fire({
      title: 'Wait',
      text: 'Creating Promotion',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.promoService
      .newPromotion(
        this.promoContent.controls.promoName.value,
        this.promoContent.controls.discount.value
      )
      .subscribe((res: Promotion) => {
        Swal.fire({
          title: `${res.promoname}`,
          text: 'Created',
          icon: 'success',
        }).then((res) => {
          if (res.value) {
            this.router.navigate(['/promos']);
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
