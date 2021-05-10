import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/model/brand';
import { Category } from 'src/app/model/category';
import { Model } from 'src/app/model/model';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ModelService } from 'src/app/services/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
})
export class ModelComponent implements OnInit {
  categories: Category[] = [];
  brands: Brand[] = [];
  model: Model;
  modelContent: FormGroup;
  submit = false;
  showPassword = false;

  constructor(
    private modelService: ModelService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
    });

    this.brandService.getBrands().subscribe((res: Brand[]) => {
      this.brands = res;
    });

    this.modelContent = new FormGroup({
      modelName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      brand: new FormControl(''),
      category: new FormControl(''),
    });
  }

  resetForm(): void {
    this.submit = false;
    this.modelContent.reset();
  }

  postModel() {
    Swal.fire({
      title: 'Wait',
      text: 'Creating model',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.modelService.newModel(
      this.modelContent.controls.modelName.value,
      this.modelContent.controls.brand.value,
      this.modelContent.controls.category.value
    ).subscribe((res: Model) => {
      Swal.fire({
        title: `${res.modelName}`,
        text: 'Created',
        icon: 'success',
      }).then((res) => {
        if (res.value) {
          this.router.navigate(['/vehicles/models']);
          this.ngOnInit;
        }
      });
    });
  }
}
