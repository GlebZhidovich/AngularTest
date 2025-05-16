import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { Users } from '../../api/types';
import { UsersApiService } from '../../api/users-api.service';
import { MatListModule } from '@angular/material/list';
import { UserItemComponent } from '../user-item/user-item.component';
import { NgFor } from '@angular/common';

type StatusType = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-users-list',
  imports: [MatListModule, UserItemComponent, NgFor],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  readonly users = signal<Users>([]);
  readonly status = signal<StatusType>('idle');

  private userService = inject(UsersApiService);

  ngOnInit(): void {
    this.status.set('loading');

    this.userService.getUsers().subscribe({
      next: (value) => {
        this.status.set('success');
        this.users.set(value);
      },
      error: () => {
        this.status.set('error');
      },
    });
  }
}
