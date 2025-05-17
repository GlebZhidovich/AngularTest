import { Injectable, signal } from '@angular/core';
import { OptionsType } from './types';
import { User, UserKeys, Users } from '../api/types';

type SortOptionsType<T> = {
  name: keyof T;
  type: 'up' | 'down';
};

@Injectable({
  providedIn: 'root',
})
export class UsersSortService {
  readonly config = signal<SortOptionsType<User>>({
    name: 'id',
    type: 'down',
  });

  sortByName(name: OptionsType) {
    if (name === this.config().name) {
      this.config.update((value) => ({
        ...value,
        type: value.type === 'down' ? 'up' : 'down',
      }));
    } else {
      this.config.set({
        name,
        type: 'down',
      });
    }
  }

  getSorted(users: Users) {
    const { type, name } = this.config();
    const compareFunction =
      type === 'down' ? compareFunctionDown : compareFunctionUp;
    return users.slice().sort(compareFunction(name));
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
