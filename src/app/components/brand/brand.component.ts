import { Component, OnInit } from '@angular/core';
import { Brands } from 'src/app/model/brand';
import { BrandService } from 'src/app/services/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
}
