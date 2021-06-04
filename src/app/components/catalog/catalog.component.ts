import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  vehicles: Vehicle[] = [];
  loading = false;
  nan = "NaN";

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.loading = true;
    this.vehicleService.getVehicles().subscribe((res: Vehicle[]) => {
      this.vehicles = res;
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

}
