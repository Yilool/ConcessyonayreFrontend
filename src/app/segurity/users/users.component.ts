import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListUser } from 'src/app/model/listuser';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: ListUser[] = [];
  loading = false;
  first = 0;
  rows = 10;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe((res: ListUser[]) => {
      this.users = res;

      this.loading = false;
    });
  }

  delete(user: User) {
    Swal.fire({
      title: 'Confirm the operation',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.value) {
        this.userService.deleteUser(user.username).subscribe((res) => {
          this.ngOnInit();
        });
      }
    });
  }
}
