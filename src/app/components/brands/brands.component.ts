import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/model/brand';
import { BrandService } from 'src/app/services/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  loading = false;
  first = 0;
  rows = 10;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loading = true;
    this.brandService.getBrands().subscribe((res: Brand[]) => {
      this.brands = res;
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
        this.brandService.deleteBrand(code).subscribe((res) => {
          this.ngOnInit();
        });
      }
    });
  }
}
