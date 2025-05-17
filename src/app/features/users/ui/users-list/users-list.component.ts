import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from '../../model/users.service';
import { UserItemComponent } from '../user-item/user-item.component';
import { UsersControlsComponent } from '../users-controls/users-controls.component';

@Component({
  selector: 'app-users-list',
  imports: [
    MatProgressSpinnerModule,
    MatListModule,
    UserItemComponent,
    UsersControlsComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  userService = inject(UsersService);

  ngOnInit(): void {
    this.userService.load();
  }
}
