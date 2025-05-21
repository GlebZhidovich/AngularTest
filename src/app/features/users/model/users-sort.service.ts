import { Injectable, signal } from '@angular/core';
import { OptionsType } from './types';
import { User, UserKeys, Users } from '../api/types';

interface SortStrategy<T> {
  sort(items: T[], name: keyof T): T[];
}

class UpSortStrategy implements SortStrategy<User> {
  sort(items: User[], name: UserKeys): User[] {
    return items.slice().sort((a: User, b: User) => {
      if (a[name] < b[name]) {
        return 1;
      }

      if (a[name] > b[name]) {
        return -1;
      }

      return 0;
    });
  }
}

class DownSortStrategy implements SortStrategy<User> {
  sort(items: User[], name: UserKeys): User[] {
    return items.slice().sort((a, b) => {
      if (a[name] > b[name]) {
        return 1;
      }

      if (a[name] < b[name]) {
        return -1;
      }

      return 0;
    });
  }
}

type SortTypes = 'up' | 'down';

type SortOptionsType<T> = {
  name: keyof T;
  type: SortTypes;
};

type FilterStrategies = Record<SortTypes, SortStrategy<User>>;

@Injectable({
  providedIn: 'root',
})
export class UsersSortService {
  readonly config = signal<SortOptionsType<User>>({
    name: 'id',
    type: 'down',
  });

  private filterStrategies: FilterStrategies = {
    up: new UpSortStrategy(),
    down: new DownSortStrategy(),
  };

  get name() {
    return this.config().name;
  }

  get type() {
    return this.config().type;
  }

  setName(name: OptionsType) {
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
    const strategy = this.filterStrategies[type];
    return strategy.sort(users, name);
  }
}
