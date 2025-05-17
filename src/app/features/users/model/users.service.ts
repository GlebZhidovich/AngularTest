import { computed, inject, Injectable, signal } from '@angular/core';
import { User, Users, UserKeys } from '../api/types';
import { UsersApiService } from '../api/users-api.service';

type StatusType = 'idle' | 'loading' | 'success' | 'error';
type SortOptionsType<T> = {
  name: keyof T;
  type: 'up' | 'down';
};

type FilterOptionsType<T> = {
  name: keyof T;
  value: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userService = inject(UsersApiService);

  readonly loadedUsers = signal<Users>([]);
  readonly status = signal<StatusType>('idle');
  readonly sortOptions = signal<SortOptionsType<User>>({
    name: 'id',
    type: 'down',
  });
  readonly filterOptions = signal<FilterOptionsType<User>>({
    name: 'id',
    value: '',
  });
  readonly users = computed(() => {
    const { name, type } = this.sortOptions();
    const compareFunction =
      type === 'down' ? compareFunctionDown : compareFunctionUp;
    const filteredUsers = this.getFilteredUsers();
    const sortedUsers = filteredUsers.sort(compareFunction(name));

    return sortedUsers;
  });

  private getFilteredUsers() {
    const { name, value } = this.filterOptions();

    return this.loadedUsers().filter((user) => {
      const val = user[name];
      if (typeof val === 'string') {
        return val.includes(value);
      }

      return true;
    });
  }

  sortByName(name: 'email' | 'name') {
    if (name === this.sortOptions().name) {
      this.sortOptions.update((value) => ({
        ...value,
        type: value.type === 'down' ? 'up' : 'down',
      }));
    } else {
      this.sortOptions.set({
        name,
        type: 'down',
      });
    }
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

const compareFunctionDown = (name: UserKeys) => (a: User, b: User) => {
  if (a[name] > b[name]) {
    return 1;
  }

  if (a[name] < b[name]) {
    return -1;
  }

  return 0;
};

const compareFunctionUp = (name: UserKeys) => (a: User, b: User) => {
  if (a[name] < b[name]) {
    return 1;
  }

  if (a[name] > b[name]) {
    return -1;
  }

  return 0;
};
