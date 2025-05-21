import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Users } from './types';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private http = inject(HttpClient);

  getUsers(): Promise<Users> {
    return firstValueFrom(
      this.http.get<Users>('https://jsonplaceholder.typicode.com/users')
    );
  }
}
