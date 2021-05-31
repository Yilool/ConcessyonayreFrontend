import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle';
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
  financing = false;

  constructor(
    private vehicleService: VehicleService,
    private purchaseService: PurchaseService
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
        console.log(res);
        //this.customers = res;
      },
      (error) => {
        Swal.fire({
          title: `${error.error.message}`,
          text: 'ERROR',
          icon: 'error',
        });
      }
    );
    this.loading = false;
  }

  buyVehicle(vehicle: string) {
    Swal.fire({
      title: 'Purchase Form',
      html: `<input type="text" id="enrollment" class="swal2-input" placeholder="Enrollment">`,
      confirmButtonText: 'Buy',
      focusConfirm: false,
      preConfirm: () => {
        const customer;
        const enrollment; 
        const promo;
        //Swal.getPopup().querySelector('#login');
        //const password = Swal.getPopup().querySelector('#password');
        if (!customer || !enrollment || !promo) {
          Swal.showValidationMessage(`Please enter login and password`);
        }
        
        return { login: login, password: password };
      },
    }).then((result) => {
      Swal.fire(
        `
        Login: ${result.value.login}
        Password: ${result.value.password}
      `.trim()
      );
    });
  }
}
