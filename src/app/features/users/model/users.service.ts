import { computed, inject, Injectable, signal } from '@angular/core';
import { Users } from '../api/types';
import { UsersApiService } from '../api/users-api.service';
import { OptionsType, StatusType } from './types';
import { UsersFilterService } from './users-filter.service';
import { UsersSortService } from './users-sort.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userService = inject(UsersApiService);
  private sortService = inject(UsersSortService);
  private filterService = inject(UsersFilterService);

  readonly loadedUsers = signal<Users>([]);
  readonly status = signal<StatusType>('idle');

  readonly users = computed(() => {
    const filteredUsers = this.filterService.getFiltered(this.loadedUsers());
    return this.sortService.getSorted(filteredUsers);
  });

  get sortData() {
    return this.sortService.config();
  }
  get filterData() {
    return this.filterService.config();
  }

  sortByName(name: OptionsType) {
    this.sortService.sortByName(name);
  }

  setFilterName(name: OptionsType) {
    this.filterService.setName(name);
  }

  setFilterValue(value: string) {
    this.filterService.setValue(value);
  }

  load() {
    this.status.set('loading');

    this.userService.getUsers().subscribe({
      next: (value) => {
        this.status.set('success');
        this.loadedUsers.set(value);
      },
      error: () => {
        this.status.set('error');
      },
    });
  }
}
