import { Injectable, signal } from '@angular/core';
import { User, Users } from '../api/types';
import { FilterOptionsType, OptionsType } from './types';

@Injectable({
  providedIn: 'root',
})
export class UsersFilterService {
  readonly config = signal<FilterOptionsType<User>>({
    name: 'name',
    value: '',
  });

  getFiltered(users: Users) {
    const { name, value } = this.config();

    return users.filter((user) => {
      const val = user[name];
      if (typeof val === 'string') {
        return val.toLowerCase().includes(value);
      }

      return true;
    });
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
