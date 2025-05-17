import { User } from './../../api/types';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../model/users.service';
import { NgFor, TitleCasePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-users-controls',
  imports: [MatIconModule, MatButtonModule, NgFor, TitleCasePipe, NgClass],
  templateUrl: './users-controls.component.html',
  styleUrl: './users-controls.component.scss',
})
export class UsersControlsComponent {
  userService = inject(UsersService);
  options = ['name', 'email'] as const;

  isUpSortIconClassName(option: 'name' | 'email') {
    const { name, type } = this.userService.sortOptions();
    return option === name && type === 'up';
  }
}
