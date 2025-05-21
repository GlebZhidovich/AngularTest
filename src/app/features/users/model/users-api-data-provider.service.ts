import { inject, Injectable } from '@angular/core';
import { UsersApiService } from '../api/users-api.service';
import { Users } from '../api/types';

interface IUserDataProvider {
  getUsers(): Promise<Users>;
}

@Injectable({ providedIn: 'root' })
export class UserApiDataProvider implements IUserDataProvider {
  private userService = inject(UsersApiService);

  async getUsers(): Promise<Users> {
    return this.userService.getUsers();
  }
}
