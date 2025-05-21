import { Injectable, signal } from '@angular/core';
import { User, UserKeys, Users } from '../api/types';
import { FilterOptionsType, OptionsType } from './types';

interface FilterStrategy<T> {
  filter(items: T[], propertyName: UserKeys, value: string): T[];
}

class StringPropertyFilterStrategy implements FilterStrategy<User> {
  filter(users: Users, propertyName: UserKeys, value: string): Users {
    return users.filter((user) => {
      const val = user[propertyName];
      return typeof val === 'string'
        ? val.toLowerCase().includes(value.toLowerCase())
        : true;
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class UsersFilterService {
  readonly config = signal<FilterOptionsType<User>>({
    name: 'name',
    value: '',
  });

  private filterStrategy = new StringPropertyFilterStrategy();

  getFiltered(users: Users) {
    const { name, value } = this.config();
    return this.filterStrategy.filter(users, name, value);
  }

  setName(name: OptionsType) {
    this.config.set({
      name,
      value: '',
    });
  }

  setValue(value: string) {
    this.config.update((obj) => ({
      ...obj,
      value,
    }));
  }
}
