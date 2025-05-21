import { computed, inject, Injectable, signal } from '@angular/core';
import { Users } from '../api/types';
import { OptionsType, StatusType } from './types';
import { UserApiDataProvider } from './users-api-data-provider.service';
import { UsersFilterService } from './users-filter.service';
import { UsersSortService } from './users-sort.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userDataProvider = inject(UserApiDataProvider);
  private sortService = inject(UsersSortService);
  private filterService = inject(UsersFilterService);

  readonly loadedUsers = signal<Users>([]);
  readonly status = signal<StatusType>('idle');

  readonly users = computed(() => {
    const users = this.loadedUsers();
    return this.applyFiltersAndSorting(users);
  });

  private applyFiltersAndSorting(users: Users): Users {
    const filteredUsers = this.filterService.getFiltered(users);
    return this.sortService.getSorted(filteredUsers);
  }

  get sortName() {
    return this.sortService.name;
  }

  get sortType() {
    return this.sortService.type;
  }

  get filterConfig() {
    return this.filterService.config();
  }

  setSortName(name: OptionsType): void {
    this.sortService.setName(name);
  }

  setFilterName(name: OptionsType): void {
    this.filterService.setName(name);
  }

  setFilterValue(value: string): void {
    this.filterService.setValue(value);
  }

  async load(): Promise<void> {
    this.status.set('loading');

    try {
      const users = await this.userDataProvider.getUsers();
      this.loadedUsers.set(users);
      this.status.set('success');
    } catch (error) {
      this.status.set('error');
    }
  }
}
