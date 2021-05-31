import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  loading = false;
  first = 0;
  rows = 10;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
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
        this.categoryService.deleteCategory(code).subscribe((res) => {
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
