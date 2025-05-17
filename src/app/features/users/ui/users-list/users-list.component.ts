import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { Users } from '../../api/types';
import { UsersApiService } from '../../api/users-api.service';
import { MatListModule } from '@angular/material/list';
import { UserItemComponent } from '../user-item/user-item.component';
import { NgFor } from '@angular/common';
import { UsersControlsComponent } from '../users-controls/users-controls.component';
import { UsersService } from '../../model/users.service';

@Component({
  selector: 'app-users-list',
  imports: [MatListModule, UserItemComponent, NgFor, UsersControlsComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  userService = inject(UsersService);

  ngOnInit(): void {
    this.userService.load();
  }
}
