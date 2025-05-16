import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from './types';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private http = inject(HttpClient);

  getUsers(): Observable<Users> {
    return this.http.get<Users>('https://jsonplaceholder.typicode.com/users');
  }
}
