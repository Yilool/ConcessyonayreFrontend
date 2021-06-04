import { Component, OnInit } from '@angular/core';
import { Msg } from 'src/app/model/msg';
import { Promotion } from 'src/app/model/promotion';
import { Vehicle } from 'src/app/model/vehicle';
import { PromotionService } from 'src/app/services/promotion.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  vehicles: Vehicle[] = [];
  loading = false;
  first = 0;
  rows = 10;
  customers: any;
  promos: Promotion[] = [];
  financing = false;

  constructor(
    private vehicleService: VehicleService,
    private purchaseService: PurchaseService,
    private promoService: PromotionService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.vehicleService.getVehicles().subscribe(
      (res: Vehicle[]) => {
        this.vehicles = res;
      },
      (error) => {
        Swal.fire({
          title: `${error.error.message}`,
          text: 'ERROR',
          icon: 'error',
        });
      }
    );
    this.purchaseService.getCustomers().subscribe(
      (res) => {
        this.customers = res;
      },
      (error) => {
        Swal.fire({
          title: `${error.error.message}`,
          text: 'ERROR',
          icon: 'error',
        });
      }
    );
    this.promoService.getPromotions().subscribe((res: Promotion[]) => {
      res.forEach((promo) => {
        let dnow = new Date(Date.now());
        let d1 = new Date(promo.startDate);
        let d2;

        if (promo.finishDate) {
          d2 = new Date(promo.finishDate)
        }
        
        if (d1 < dnow && (!d2 || dnow < d2)) {
          this.promos.push(promo);
        }
      });
    });
    this.loading = false;
  }

  buyVehicle(vehicle: string) {
    Swal.fire({
      title: 'Purchase Form',
      html: `<input type="text" class="swal2-input" placeholder="Enrollment">
      <input type="text" class="swal2-input" placeholder="Custom DNI">
      <input type="text" class="swal2-input" placeholder="Promotion">`,
      confirmButtonText: 'Buy',
      focusConfirm: false,
      preConfirm: () => {
        var customer: string;
        var promotion: string;
        var enrollment = Swal.getPopup().getElementsByTagName('input')[0].value;
        var dni = Swal.getPopup().getElementsByTagName('input')[1].value;
        var promo = Swal.getPopup().getElementsByTagName('input')[2].value;
        
        if (!enrollment || !dni || !promo) {
          Swal.showValidationMessage(`Please complete all fields`);
        }

        this.customers.forEach(c => {
          if (c.dni == dni) {
            customer = c.cod;
          }
        });

        this.promos.forEach(p => {
          if (p.promoname == promo) {
            promotion = p.cod;
          }
        });
        
        if (!customer) {
          Swal.showValidationMessage(`Customer not exist`);
        }

        if (!promotion) {
          Swal.showValidationMessage(`Promotion not exist`);
        }

        this.purchaseService.newPurchase(vehicle, customer, enrollment, promotion).subscribe(
          (res: Msg) => {
            Swal.fire(res.msg);
            this.ngOnInit();
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
