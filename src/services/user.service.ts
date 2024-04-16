import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://reqres.in/api';
  private cachedUsers: Map<number, any[]> = new Map();

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    if (this.cachedUsers.has(page)) {
      return of(this.cachedUsers.get(page));
    } else {
      return this.http.get(`${this.baseUrl}/users?page=${page}`).pipe(
        tap((response: any) => {
          this.cachedUsers.set(page, response);
        })
      );
    }
  }

  getUserDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }


}
