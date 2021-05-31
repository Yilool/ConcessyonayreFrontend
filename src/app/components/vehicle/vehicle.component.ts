import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fuel } from 'src/app/model/fuel';
import { Model } from 'src/app/model/model';
import { Vehicle } from 'src/app/model/vehicle';
import { FuelService } from 'src/app/services/fuel.service';
import { ModelService } from 'src/app/services/model.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  vehicle = new Vehicle();
  fuels: Fuel[] = [];
  models: Model[] = [];

  constructor(
    private fuelService: FuelService,
    private vehicleService: VehicleService,
    private modelService: ModelService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('cod');

    if (code !== 'new') {
      this.vehicleService.getVehicle(code).subscribe((res: Vehicle) => {
        this.vehicle = res;
      },
      (error) => {
        Swal.fire({
          title: `${error.error.message}`,
          text: 'ERROR',
          icon: 'error',
        });
      });
    }

    this.fuelService.getFuel().subscribe(
      (res: Fuel[]) => {
        this.fuels = res;
      },
      (error) => {
        Swal.fire({
          title: `${error.error.message}`,
          text: 'Exception',
          icon: 'error',
        });
      }
    );

    this.modelService.getModels().subscribe(
      (res: Model[]) => {
        this.models = res;
      },
      (error) => {
        Swal.fire({
          title: `${error.error.message}`,
          text: 'Exception',
          icon: 'error',
        });
      }
    );
  }

  postOrPut(data: NgForm) {
    const code = this.route.snapshot.paramMap.get('cod');

    if (code !== 'new') {
      this.putVehicle();
    } else {
      this.postVehicle();
    }
  }

  postVehicle() {
    Swal.fire({
      title: 'Wait',
      text: 'Creating vehicle',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.vehicleService.newVehicle(this.vehicle).subscribe(
      (res) => {
        Swal.fire({
          title: `${this.vehicle.cod}`,
          text: 'Created',
          icon: 'success',
        });
        // redireccionado a la páginas de libros
        this.router.navigate(['/vehicles']);
      },
      // notificacion de errores
      (error) => {
        Swal.fire({
          title: `${error.error.message}`,
          text: 'Exception',
          icon: 'error',
        });
      }
    );
  }

  putVehicle() {
    Swal.fire({
      title: 'Wait',
      text: 'Updating vehicle',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.vehicleService.updateVehicle(this.vehicle).subscribe(
      (res) => {
        Swal.fire({
          title: `${this.vehicle.cod}`,
          text: 'Updated',
          icon: 'success',
        });
        // redireccionado a la páginas de libros
        this.router.navigate(['/vehicles']);
      },
      // notificacion de errores
      (error) => {
        Swal.fire({
          title: `${error.error.message}`,
          text: 'Exception',
          icon: 'error',
        });
      }
    );
  }

  vehicleImage() {
    const inputNode: any = document.querySelector('#img');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.readAsArrayBuffer(inputNode.files[0]);

      reader.onload = (e: any) => {
        this.vehicle.photo = btoa(
          new Uint8Array(e.target.result).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
      };
    }
  }
}
