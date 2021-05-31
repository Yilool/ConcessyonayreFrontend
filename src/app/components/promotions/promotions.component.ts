import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/model/promotion';
import { PromotionService } from 'src/app/services/promotion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css'],
})
export class PromotionsComponent implements OnInit {
  promotions: Promotion[] = [];
  loading = false;
  first = 0;
  rows = 10;

  constructor(private promoService: PromotionService) {}

  ngOnInit(): void {
    this.loading = true;
    this.promoService.getPromotions().subscribe((res: Promotion[]) => {
      this.promotions = res;
    },
    (error) => {
      Swal.fire({
        title: `${error.error.message}`,
        text: 'ERROR',
        icon: 'error',
      });
    });
    this.loading = false;
  }

  delete(code: string) {
    Swal.fire({
      title: 'Confirm the operation',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.value) {
        this.promoService.deletePromotion(code).subscribe((res) => {
          this.ngOnInit();
        },
        (error) => {
          Swal.fire({
            title: `${error.error.message}`,
            text: 'ERROR',
            icon: 'error',
          });
        });
      }
    });
  }
}
