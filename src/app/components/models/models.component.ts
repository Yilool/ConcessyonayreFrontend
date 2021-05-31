import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/model/model';
import { ModelService } from 'src/app/services/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css'],
})
export class ModelsComponent implements OnInit {
  models: Model[] = [];
  loading = false;
  first = 0;
  rows = 10;

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.loading = true;
    this.modelService.getModels().subscribe((res: Model[]) => {
      this.models = res;
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
        this.modelService.deleteModel(code).subscribe((res) => {
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