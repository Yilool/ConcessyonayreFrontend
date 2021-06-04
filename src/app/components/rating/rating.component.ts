import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Msg } from 'src/app/model/msg';
import { Vehicle } from 'src/app/model/vehicle';
import { RatingService } from 'src/app/services/rating.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  customer: number;
  vehicles: Vehicle[] = [];
  loading = false;
  first = 0;
  rows = 10;

  constructor(
    private route: ActivatedRoute,
    private rateService: RatingService
  ) {}

  ngOnInit(): void {
    this.customer = Number(this.route.snapshot.paramMap.get('cod'));

    this.rateService.getCustomerVehicles(this.customer).subscribe((res: Vehicle[]) => {
      this.vehicles = res;
    },
    (error) => {
      Swal.fire({
        title: `${error.error.message}`,
        text: 'ERROR',
        icon: 'error',
      });
    });
  }

  rateVehicle(vehicle: string) {
    Swal.fire({
      title: 'Rating Form',
      html: `<input type="number" class="swal2-input" placeholder="Rating: 1-5">
      <input type="text" class="swal2-input" placeholder="Comment">`,
      confirmButtonText: 'Rate',
      focusConfirm: false,
      preConfirm: () => {
        var rate = Swal.getPopup().getElementsByTagName('input')[0].value;
        var comment = Swal.getPopup().getElementsByTagName('input')[1].value;

        if (!rate || !comment) {
          Swal.showValidationMessage(`Please complete all fields`);
        }

        this.rateService.postRating(Number(rate), comment, this.customer, vehicle).subscribe(
          (res: Msg) => {
            Swal.fire(res.msg);
          },
          (error) => {
            Swal.fire({
              title: `${error.error.message}`,
              text: 'ERROR',
              icon: 'error',
            });
          }
        );
      },
    });
  }
}
