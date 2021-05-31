import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryContent: FormGroup;
  submit = false;
  showPassword = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryContent = new FormGroup({
      categoryName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  resetForm(): void {
    this.submit = false;
    this.categoryContent.reset();
  }

  postCategory() {
    Swal.fire({
      title: 'Wait',
      text: 'Creating category',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.categoryService
      .newCategory(this.categoryContent.controls.categoryName.value)
      .subscribe((res: Category) => {
        Swal.fire({
          title: `${res.categoryName}`,
          text: 'Created',
          icon: 'success',
        }).then((res) => {
          if (res.value) {
            this.router.navigate(['/vehicles/categories']);
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
